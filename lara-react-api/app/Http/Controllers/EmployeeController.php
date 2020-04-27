<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\EmployeeModel;
use Validator;

class EmployeeController extends Controller
{
	public function showemp(){
		return response()->json(EmployeeModel::get() ,200);
	}

	public function  showempbyid($id){
		$emp = EmployeeModel::find($id);
		if(is_null($emp))
		{
			return response()->json(["message" => "Record Not Found.!"] ,404);	
		}
		return response()->json($emp , 200);
		
	}   

	public function addemp(Request $req){
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

	public function updateemp(Request $req, $id){
		$emp = EmployeeModel::find($id);
		if(is_null($emp))
		{
			return response()->json(["message" => "Record Not Found.!"] ,404);	
		}
		$emp->update($req->all());
		return response()->json($emp , 200);
	}

	public function deleteeemp(Request $req, $id){
		$emp = EmployeeModel::find($id);
		if(is_null($emp))
		{
			return response()->json(["message" => "Record Not Found.!"] ,404);	
		}
		$emp->delete();
		return response()->json(null, 204);
	}
}
