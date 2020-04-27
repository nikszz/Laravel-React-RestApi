<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\EmployeeModel;
use Validator;

class EmpController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(EmployeeModel::get() ,200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $req)
    {
        $rules = [
            'fname' => 'required|min:3',
            'lname' => 'required|min:3',
            'dept' => 'required',
            'addr' => 'required|min:3',
        ];
        $validator = Validator::make($req->all(), $rules);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        $data = EmployeeModel::create($req->all());
        return response()->json($data , 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
       $emp = EmployeeModel::find($id);
        if(is_null($emp))
        {
            return response()->json(["message" => "Record Not Found.!"] ,404);  
        }
        return response()->json($emp , 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $req, $id)
    {
        $emp = EmployeeModel::find($id);
        if(is_null($emp))
        {
            return response()->json(["message" => "Record Not Found.!"] ,404);  
        }
        $emp->update($req->all());
        return response()->json($emp , 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $emp = EmployeeModel::find($id);
        if(is_null($emp))
        {
            return response()->json(["message" => "Record Not Found.!"] ,404);  
        }
        $emp->delete();
        return response()->json(null, 204);
    }
}
