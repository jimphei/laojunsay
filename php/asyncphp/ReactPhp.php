<?php

require __DIR__ . '/vendor/autoload.php';

use React\EventLoop\Loop;
use React\Promise\Promise;

// React\Async\coroutine(function () {
//     $browser = new React\Http\Browser();
//     try {
//         $response = yield $browser->get('https://example.com/');
//         assert($response instanceof Psr\Http\Message\ResponseInterface);
//         echo $response->getBody();
//     } catch (Exception $e) {
//         echo 'Error: ' . $e->getMessage() . PHP_EOL;
//     }
// });

function getPromise($i){
    return new Promise(function ($resolve) use($i){
        $url = 'https://www.baidu.com/?i=';
        $browser = new React\Http\Browser();
        $response = $browser->get($url.$i);
        sleep(6-$i);
        $resolve("第{$i}次访问百度完成");
    });
}
$start = microtime(true);
React\Async\parallel([
    function () {
        return getPromise(1);
    },
    function () {
        return getPromise(2);
    },
    function () {
        return getPromise(3);
    },
    function () {
        return getPromise(4);
    },
    function () {
        return getPromise(5);
    }             
])->then(function (array $results) {
    foreach ($results as $result) {
        var_dump($result);
    }
}, function (Exception $e) {
    echo 'Error: ' . $e->getMessage() . PHP_EOL;
});
echo "处理完成，总用时：".microtime(true)-$start."\n";