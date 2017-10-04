<?php

namespace dbc\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class UartDualBoxCarController extends Controller
{
    //
    public function forword(Request $request) {
        return redirect()->back();
    }
    //
    public function back(Request $request) {
        return redirect()->back();
    }
    //
    public function left(Request $request) {
        return redirect()->back();
    }
    //
    public function right(Request $request) {
        return redirect()->back();
    }
    //
    public function stop(Request $request) {
        return redirect()->back();
    }
}
