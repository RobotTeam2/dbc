<?php

namespace dbc\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class UartDualBoxCarController extends Controller
{
    //
    const CHANNEL = '/dbc/webui2uart';
    public function forword(Request $request) {
        Redis::publish(CHANNEL, 'forword');
        return redirect()->back();
    }
    //
    public function back(Request $request) {
        Redis::publish(CHANNEL, 'back');
        return redirect()->back();
    }
    //
    public function left(Request $request) {
        Redis::publish(CHANNEL, 'left');
        return redirect()->back();
    }
    //
    public function right(Request $request) {
        Redis::publish(CHANNEL, 'right');
        return redirect()->back();
    }
    //
    public function stop(Request $request) {
        Redis::publish(CHANNEL, 'stop');
        return redirect()->back();
    }
}
