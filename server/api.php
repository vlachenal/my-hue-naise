<?php
/*
   MyHUEnaise: My HUE network administration interface simple edition
   Copyright (C) 2015 Vincent Lachenal

   This file is part of MyHUEnaise.

    MyHUEnaise is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    MyHUEnaise is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with MyHUEnaise.  If not, see <http://www.gnu.org/licenses/>.

 */
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Clue\React\Ssdp\Client;

require $_SERVER['DOCUMENT_ROOT'].'/vendor/autoload.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$config['db']['dbfile'] = $_SERVER['DOCUMENT_ROOT']."/user.db";

$app = new \Slim\App(["settings" => $config]);

$container = $app->getContainer();
$container['db'] = function ($c) {
    $db = $c['settings']['db'];
    $createTables = false;
    if(!file_exists($db['dbfile'])) {
        $createTables = true;
    }
    $pdo = new PDO("sqlite:".$db['dbfile']);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    if($createTables) {
        $pdo->exec("CREATE TABLE T_User (
  bridge_id VARCHAR(512) PRIMARY KEY,
  user_id VARCHAR(512) NOT NULL,
  bridge_name VARCHAR(512)
);");
    }
    return $pdo;
};

$app->get('/hue/api/bridge', function (Request $request, Response $response) {
    $bridges = array();
    // Look for bridges through UPnP/SSDP +
    $loop = React\EventLoop\Factory::create();
    $client = new Client($loop);
    $client->search('urn:schemas-upnp-org:device:basic:1',1)->then(
        function() use (&$bridges) {
            // Nothing to do
        },
        function($e) use (&$bridges) {
            // Nothing to do
        },
        function ($progress) use (&$bridges) {
            $device = array();
            $ip = preg_split("/:/", $progress["_sender"], 2)[0];
            foreach(preg_split("/((\r?\n)|(\r\n?))/", $progress["data"]) as $line) {
                $items = preg_split("/: /", $line, 2);
                if(count($items) == 2) {
                    $device[$items[0]] = $items[1];
                }
            }
            if(array_key_exists('hue-bridgeid', $device)) {
                $found = false;
                $id = strtolower($device['hue-bridgeid']);
                foreach($bridges as $bridge) {
                    if($bridge["id"] === $id) {
                        $found = true;
                        break;
                    }
                }
                if(!$found) {
                    $bridges[] = array(
                        "id" => $id,
                        "internalipaddress" => $ip
                    );
                }
            }
        }
    );
    $loop->run();
    // Look for bridges through UPnP/SSDP -
    if(empty($bridges)) {
        // Look for bridges through Philipps HUE nUPnP
        $bridges = json_decode(file_get_contents("https://www.meethue.com/api/nupnp"), true);
    }
    $stmt = $this->db->prepare("SELECT user_id, bridge_name FROM T_User WHERE bridge_id = ?");
    $result = array();
    foreach($bridges as $bridge) {
        $stmt->bindParam(1, $bridge["id"]);
        if($stmt->execute()) {
            $row = $stmt->fetch(PDO::FETCH_NUM);
            if($row) {
                $result[] = array(
                    "id" => $bridge["id"],
                    "internalipaddress" => $bridge["internalipaddress"],
                    "userid" => $row[0],
                    "name" => $row[1]
                );
            } else {
                $result[] = $bridge;
            }
        } else {
            $result[] = $bridge;
        }
    }
    return $response->withJson($result);
});

$app->get('/hue/api/bridge/{bridgeId}', function (Request $request, Response $response) {
    $bridgeId = $request->getAttribute('bridgeId');
    $stmt = $this->db->prepare("SELECT user_id, bridge_name FROM T_User WHERE bridge_id = ?");
    $stmt->bindParam(1, $bridgeId);
    if($stmt->execute()) {
        $row = $stmt->fetch(PDO::FETCH_NUM);
        if($row) {
            $res = array(
                "bridgeid" => $bridgeId,
                "userid" => $row[0],
                "bridgename" => $row[1]
            );
            $response = $response->withJson($res);
        } else {
            $response = $response->withStatus(204);
        }
    } else {
        $response = $response->withStatus(500);
    }
    return $response;
});

$app->post('/hue/api/bridge', function (Request $request, Response $response) {
    $bridge = $request->getParsedBody();
    $stmt = $this->db->prepare("INSERT INTO T_User (bridge_id, user_id, bridge_name) VALUES (?, ?, ?)");
    $stmt->bindParam(1, $bridge["bridgeid"]);
    $stmt->bindParam(2, $bridge["userid"]);
    $stmt->bindParam(3, $bridge["bridgename"]);
    if($stmt->execute()) {
        $response = $response->withStatus(201);
    } else {
        $response = $response->withStatus(500);
    }
    return $response;
});

$app->put('/hue/api/bridge/{bridgeId}', function (Request $request, Response $response) {
    $bridgeId = $request->getAttribute('bridgeId');
    $bridge = $request->getParsedBody();
    $stmt = $this->db->prepare("UPDATE T_User SET user_id = ?, bridge_name = ? WHERE bridge_id = ?");
    $stmt->bindParam(1, $bridge["userid"]);
    $stmt->bindParam(2, $bridge["bridgename"]);
    $stmt->bindParam(3, $bridgeId);
    if(!$stmt->execute()) {
        $response = $response->withStatus(500);
    }
    return $response;
});

$app->run();
