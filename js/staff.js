$(document).ready(function(){
    var str1="";
    var str2="";
    /* $.ajax({
        type: "GET",
        url: "./data_layer/view_staff.php",
        //data:{username: userid , upassword:password, urole:role},
        success: function(data){
            //alert(data);
            if ($.trim() === '0'){
                alert('No data found');
             }
            else{
                $.each(data, function(index, element){
                    str1+="<tr class='table-active'>";
                    str1+="<td>"+element.name+"</td>";
                    str1+="<td>"+element.address+"</td>";
                    str1+="<td>"+element.telephone+"</td>";
                    str1+="<td>"+element.email+"</td>";
                    str1+="<td>"+element.userid+"</td>";
                    str1+="</tr>"
                });
                $("#staff tbody").append(str1);
            }
            
        },
        error: function (request, error) {
            console.log(error);
            
        
        }
    }); */

        //checking with Datatable jquery plugin
        $('#staff').DataTable( {
            ajax: {
                url: './data_layer/view_staff.php',
                dataSrc: ''
            },
            "createdRow": function( row, data, dataIndex ) {
                  $(row).addClass( 'table-active' );
              },
            "columns": [
                { "data": "name" },
                { "data": "address" },
                { "data": "telephone" },
                { "data": "email" },
                { "data": "userid" }
            ]
        } );
    

    $.ajax({
        type: "GET",
        url: "./data_layer/view_students.php",
        //data:{username: userid , upassword:password, urole:role},
        success: function(data){
            //alert(data);
            if ($.trim() === '0'){
                alert('No data found');
             }
            else{
                $.each(data, function(index, element){
                    str2+="<tr class='table-active'>";
                    str2+="<td>"+element.name+"</td>";
                    str2+="<td>"+element.address+"</td>";
                    str2+="<td>"+element.telephone+"</td>";
                    str2+="<td>"+element.emergency_contact+"</td>";
                    str2+="<td>"+element.email+"</td>";
                    str2+="<td>"+element.userid+"</td>";
                    str2+="</tr>"
                });
                $("#student tbody").append(str2);
            }
            
        },
        error: function (request, error) {
            console.log(error);
            
        
        }
    });


});