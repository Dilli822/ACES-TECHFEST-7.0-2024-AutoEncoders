<?php
function uploadImage($request,$object,$fileName)
{
    if($request->hasFile($fileName))
    {
        $file = $request->$fileName;
        $newName = uniqid() .".".$file->getclientOriginalExtension();
        $file->move('images',$newName);
        $object->$fileName = "images/$newName";
    }
}
?>
