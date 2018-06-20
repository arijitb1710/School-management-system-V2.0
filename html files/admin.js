$(document).ready(function(){
    
    var userid_exists=0;
    $("#file").val("");
    $("#name").val("");
    $("#id").val("");
    var row=0;
    var col=0;
    var type="";
    var value="";
    var col_array =["name","address","telephone","emergency","role","email","userid","password"];
    var changed_cols=[];
    var changed_values=[];
    var temp_cols=[];
    $("#add input:nth-child(1)").val("");
    $("#add input:nth-child(2)").val("");
    $("#add input:nth-child(3)").val("");
    $("#add input:nth-child(4)").val("");
    $("#add input:nth-child(6)").val("");
    $("#add input:nth-child(7)").val("");
    $("#add input:nth-child(8)").val("");

// Error messages for input elements
$("#add input:nth-child(1)").blur(function(e){
    if($(this).val().length === 0){
        alert("Please enter username");
    }
});
$("#add input:nth-child(2)").blur(function(e){
    if($(this).val().length === 0){
        alert("Please enter address");
    }
});
$("#add input:nth-child(3)").blur(function(e){
    if($(this).val().length === 0){
        alert("Please enter telephone");
    }
});
$("#add input:nth-child(4)").blur(function(e){
    if($(this).val().length === 0){
        alert("Please enter emergency contact");
    }
});
$("#add input:nth-child(6)").blur(function(e){
    if($(this).val().length === 0){
        alert("Please enter email");
    }});
$("#add input:nth-child(7)").blur(function(e){
    var val = $(this).val();
    if($(this).val().length === 0){
        alert("Please enter userid");
    }

    if($(this).val().length != 0)
    {
    $.ajax({
     type: "POST",
     url: "./data_layer/check_same_userid.php",
     data:{user_id:val},
     success: function(data){
         alert(data);
         if(data.trim()!="0")
         {
         userid_exists=1;
         //alert(userid_exists);
         }
         // if (data.trim() === 'admin'){
         //     //$("#login-success-popup").show();
         // window.location.href="admin.html";
         // }
         // else{
         //     alert("Only admin allowed!!");
         // }
         
     },
     error: function (request, error) {
         console.log(error);
         
     
     }
 });
 }
});
$("#add input:nth-child(8)").blur(function(e){
    if($(this).val().length === 0){
        console.log("Please enter password");
    }
});
$("#add select:nth-child(5)").blur(function(e){
   //alert($(this).val());
});


    $("#users").click(function(e){
        $("#div2").hide();
        $("#div1").show();
        $("#users-button").show();
        $("#div3").hide();
       $(".form-users").hide();
       $("#div4").hide();
    });

    $("#notice").click(function(e){
        $("#div1").hide();
        $("#div2").show();
        $("#div3").hide();
        $("#div4").hide();
    });

    $("#stu-detail").click(function(e){
        $("#div1").hide();
        $("#div2").hide();
        $("#div3").show();
        $("#div4").hide();
    });

    $("#approve-leave").click(function(){
        $("#div1").hide();
        $("#div2").hide();
        $("#div3").hide();
        $("#div4").show();
    });

    $("#users-button button:nth-child(1)").click(function(e){
        type="ADD";
        $(".form-users").show();
        $("#remove-update").hide();
    })

    $("#users-button button:nth-child(2)").click(function(e){
        type="REMOVE";
        $(".form-users").hide();
        $("#remove-update").show();
        $("#display-users").hide();        
        $("#users-button button:nth-child(4)").text("CONFIRM");
    })

    $("#users-button button:nth-child(3)").click(function(e){
        type="UPDATE";
        $(".form-users").hide();
        $("#remove-update").show();
        $("#display-users").hide();

        //Making the cells editable
        

    });


    $("#submit").click(function(e){
        e.preventDefault();
        
        var property = document.getElementById("file").files[0];
        //alert(property);
        var file_name = property.name;
        //alert(file_name);
        var form_data = new FormData();
        form_data.append("file", property);
        //alert(form_data);
        
        $.ajax({
           type: "POST",
           url: "upload.php",
           data: form_data,
           success: function(data){
               //alert(data);
              //alert(data);
              if(data.trim()==="TRUE"){
                $(".notice p").show();
              var str="<img style='width:100%; height: 100%;' src = './uploads/"+file_name+"'>";
              $("#file-show").append(str);
           }
                             
           },
           cache: false,
           contentType: false,
           processData: false,
           error: function (request, error) {

               alert(error);
               
           
           }
       });

       
      });

      $("#search").click(function(e){
        name=$("#name").val();
        id=$("#id").val();
        $.ajax({
            type: "POST",
            url: "./data_layer/search.php",
            data: {uname:name,uid:id},
            success: function(data){
            //alert(data);
            if(($('#display-users tr').length)>=8)
            {
                $("#display-users").find("tr td:nth-last-child(-n+8)").remove();
            }
                     
            if(data!="0"){
            var str="";
            str+="<tr><td class='add-users'>"+data.name+"</td></tr>";
            str+="<tr><td class='add-users'>"+data.address+"</td></tr>";
            str+="<tr><td class='add-users'>"+data.telephone+"</td></tr>";
            str+="<tr><td class='add-users'>"+data.emergency_contact+"</td></tr>";
            str+="<tr><td class='add-users'>"+data.role+"</td></tr>";
            str+="<tr><td class='add-users'>"+data.email+"</td></tr>";
            str+="<tr><td class='add-users'>"+data.userid+"</td></tr>";
            str+="<tr><td class='add-users'>"+data.password+"</td></tr>";
            $("#display-users").show();
            $("#display-users").append(str);
            }
            else{
                alert("User id does not exist");
            }
                //alert(data);
               //alert(data);
               //alert(data);
               //var obj= jQuery.parseJSON(data);
               //alert(data.name);
               //$("#file-show").append(str);
            },
            error: function (request, error) {
 
                alert(error);
                          
            }
        });   
       
        
      });

      $("#users-button button:nth-child(4)").click(function(e){
        if(type === "ADD"){

            e.preventDefault();
            var name=$("#add input:nth-child(1)").val();
            var address=$("#add input:nth-child(2)").val();
            var telephone=$("#add input:nth-child(3)").val();
            var emergency=$("#add input:nth-child(4)").val();
            var role=$("#add select:nth-child(5)").val();
            var email=$("#add input:nth-child(6)").val();
            var userid=$("#add input:nth-child(7)").val();
            var password=$("#add input:nth-child(8)").val();
            
            if((name.length !== 0) && (address.length !== 0) && (telephone.length !== 0) && (emergency.length !== 0) && (role.length !== 0) && userid_exists!=1 && (email.length !== 0) && (userid.length !== 0) && (password.length !== 0)){
              if($("#add input:nth-child(6)").is(':valid')){
                $.ajax({
                type: "POST",
                url: "./data_layer/registration_admin.php",
                data:{uname:name, uaddress:address, uemail: email,username: userid , upassword:password, utelephone:telephone,uemergency:emergency, urole:role},
                success: function(data){
                    //alert(data);
                    if (data.trim() === 'success'){
                        //$("#login-success-popup").show();
                    alert("User added successfully");
                    $("#add input:nth-child(1)").val(""); 
                    $("#add input:nth-child(2)").val("");
                    $("#add input:nth-child(3)").val("");
                    $("#add input:nth-child(4)").val("");
                    $("#add input:nth-child(6)").val("");
                    $("#add input:nth-child(7)").val("");
                    $("#add input:nth-child(8)").val("");
                    }
                    else{
                        
                        alert(data);
                    }
                    
                },
                error: function (request, error) {
                    console.log(error);
                    
                
                }
            }); //ajax call ends here

        }
        }
        }  
    
        if(type === "REMOVE"){
        
            name=$("#name").val();
            id=$("#id").val();
            $.ajax({
                type: "POST",
                url: "./data_layer/remove_user_by_admin.php",
                data:{uid:id},
                success: function(data){
                    //alert(data);
                    if (data.trim() === 'success'){
                    alert("Record deleted successfully. Refresh to view changes.");
                     }
                    else{
                        
                        alert(data);
                    }
                    
                },
                error: function (request, error) {
                    console.log(error);
                    
                
                }
            });
            

        }   

        if(type==="UPDATE"){
            alert("Update successful");
        }
            
        
        
      });
      

      $("#display-users").on("dblclick", "td", function() {
        $(this).css({'background-color':'lightblue'});
        $(this).attr('contenteditable','true');
        var row = $(this).closest("tr").index();
        var col = $(this).closest("td").index();
        $(this).on('input', function () {
            //alert(row);    
            value = $(this).text();
            
                        
         });
        
         cols=col_array[row];
        //alert("Row:"+row);
         //changed_cols.push(cols);
         $(this).on('blur',function(){
            $(this).attr('contenteditable','false');
            $(this).css({'background-color':'white'});
           var new_val=$(this).text();
           var new_row=$("#id").val();
        //alert("New val"+new_val);
        //alert("Col name:"+cols);
        //alert("Row name:"+new_row);   
        $.ajax({
            type: "POST",
            url: "./data_layer/update_admin.php",
            data:{rowname: new_row , colname:cols, cell:new_val},
            success: function(data){
                //alert(data);
                if (data.trim() === 'success'){
                console.log("Update successful");
                 }
                else{
                console.log(data);
                }
                
            },
            error: function (request, error) {
                console.log(error);
                         
            }
        });


            
             
         });
        
        });

        $("#div3 div button:nth-child(3)").click(function(){
            var str="";
            var uclass=$("#div3 div input:nth-child(1)").val();
            var section=$("#div3 div input:nth-child(2)").val();
            if(uclass.length!=0 && section.length!=0){
                $.ajax({
                    type: "POST",
                    url: "./data_layer/select_students_classwise.php",
                    data:{user_class: uclass , user_section:section},
                    success: function(data){
                        //alert(data);
                        if ($.trim(data) === '0'){
                        alert("No data found !");
                         }
                        else{
                            if($("#student-detail tbody tr").length>0){
                                $("#student-detail tbody tr").remove();
                            }
                            $.each(data, function(index, element){
                                str+="<tr>";
                                str+="<td>"+element.id+"</td>";
                                str+="<td>"+element.name+"</td>";
                                str+="<td>"+element.surname+"</td>";
                                str+="<td>"+element.class+"</td>";
                                str+="<td>"+element.section+"</td>";
                                str+="<td>"+element.roll+"</td>";
                                str+="<td>"+element.parents_contact+"</td>";
                                str+="<td>"+element.parents_email+"</td>";
                                str+="<td>"+element.address+"</td>";
                                str+="<td>"+element.guardians_contact+"</td>";
                                str+="</tr>"
                            });
                            $("#student-detail").append(str);
                            $("#student-detail").show();
                        }
                        
                    },
                    error: function (request, error) {
                        console.log(error);
                        
                    
                    }
                });

                /* $('#student-detail').DataTable( {
                    ajax: {
                        url: './data_layer/select_students_classwise.php',
                        type: 'POST',
                        data: {
                            "user_class": uclass ,
                            "user_section": section
                        }
                    },
                    "columns": [
                        { "data": "id" },
                        { "data": "name" },
                        { "data": "surname" },
                        { "data": "class" },
                        { "data": "section" },
                        { "data": "role" },
                        { "data": "parents_contact" },
                        { "data": "parents_email" },
                        { "data": "address" },
                        { "data": "guardians_contact" }
                    ]
                } ); */
            }
            else{
                alert("Please check form contents");
            }
            
        });

        $('#student-detail').DataTable( {
            ajax: {
                url: './data_layer/select_students_classwise.php',
                dataSrc: ''
            },
            "aLengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
            "pageLength": 5,
            "columns": [
                { "data": "id" },
                { "data": "name" },
                { "data": "surname" },
                { "data": "class" },
                { "data": "section" },
                { "data": "roll" },
                { "data": "parents_contact" },
                { "data": "parents_email" },
                { "data": "address" },
                { "data": "guardians_contact" }
            ]
        } ); 

        $('#leave-detail').DataTable( {
            ajax: {
                url: './data_layer/view_leaves.php',
                dataSrc: ''
            },
            "aLengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
            "pageLength": 5,
            "columns": [
                { "data": "name" },
                { "data": "surname" },
                { "data": "role" },
                { "data": "from_date" },
                { "data": "to_date" },
                { "data": "status" }
            ]
        } ); 

        $("#leave-detail").on("dblclick", "td", function(){
           // alert("Col:"+$(this).index());
            var col=$(this).index();
            if(col===5){
                $(this).css({'background-color':'white'});
                $(this).attr('contenteditable','true');
                var surname=$(this).prev().prev().prev().prev().text();
                var name=$(this).prev().prev().prev().prev().prev().text();
                //alert(surname);
                //alert(name);
                $(this).on('blur', function () {
                    $(this).css({'background-color':'yellow'});
                    $(this).attr('contenteditable','false');
                    status = $(this).text();
                    // alert("Period:"+period);
                    // alert("Day:"+day);
                    // alert("New value:"+value);
                    $.ajax({
                        type: "POST",
                        url: "./data_layer/update_leave_status.php",
                        data:{user_name: name , user_surname:surname, user_status:status},
                        success: function(data){
                            if ($.trim(data) === 'success'){
                                alert('Update successful'); 
                                //$("#save p").show();        
                            }
                            else{
                                alert('Update error');
                            }                        
                        },
                        error: function (request, error) {
                            console.log(error);
                            
                        
                        }
                    });
    
                                    
                  });
            }
        });

        /* $.ajax({
            type: "GET",
            url: "./data_layer/view_leaves.php",
            success: function(data){
                //alert(data);
                if ($.trim(data) === '0'){
                alert("Sorry , No results found!");
                 }
                else{
                    if($("#leave-detail tbody tr").length>0){
                        $("#leave-detail tbody tr").remove();
                    }
                    var str="";
                    $.each(data, function(index, element){
                        str+="<tr>";
                        str+="<td>"+element.name+"</td>";
                        str+="<td>"+element.surname+"</td>";
                        str+="<td>"+element.role+"</td>";
                        str+="<td>"+element.from_date+"</td>";
                        str+="<td>"+element.to_date+"</td>";
                        str+="<td><select><option value='OPEN' selected>"+element.status+"</option><option value='APPROVED'>APPROVED</option><option value='REJECTED'>REJECTED</option></select></td>";
                    });
                    $('#leave-detail tbody').append(str);
                }
                
            },
            error: function (request, error) {
                console.log(error);
                
            
            }
        }); */

});