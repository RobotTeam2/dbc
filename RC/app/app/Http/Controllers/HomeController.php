<?php
namespace dbc\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
class HomeController extends Controller
{
    //
    const KEY = '/dbc/speed';
    public function index() {
        Redis::publish(self::CHANNEL, 'forword');
        return redirect()->back();
    }
}
