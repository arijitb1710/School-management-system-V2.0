$(document).ready(function(){

    $.ajax({
        type: "GET",
        url: "view_file.php",
        success: function(data){
            //alert(data.trim());
            $("#image_show").append($.trim(data));
            
        },
        error: function (request, error) {
            console.log(error);
            
        
        }
    });

    $("#check").click(function(e){
        e.preventDefault();
         $.ajax({
            type: "GET",
            url: "http://localhost:3000/api/contacts",
            success: function(data){
                //alert(data);
                
                var myJSON = JSON.stringify(data); 
                alert(myJSON);
                
            },
            error: function (request, error) {

                alert(error);
                
            
            }
        });
        //alert("HI");
    }); 


    $.getJSON("demo.php", function(data){
        var id=1;
        var reg_data="";
        $.each(data, function(key,value){
            reg_data += "<tr id='"+id+"'>";
            reg_data += "<td class='name'>"+value.name+"</td>";
            reg_data += "<td class='address'>"+value.address+"</td>";
            reg_data += "<td class='email'>"+value.email+"</td>";
            reg_data += "<td class='username'>"+value.username+"</td>";
            reg_data += "<td class='password'>"+value.password+"</td>";
            reg_data += "<td><button class='edit'>Edit</button></td>";
            reg_data += "</tr>";
            id+=1;

        });
        $("#reg-table").append(reg_data);
    });
    $("#reg-table").on('click', '.edit', function(){
        // what you want to happen when mouseover and mouseout 
        // occurs on elements that match '.dosomething'
        $(this).closest("tr").attr('contenteditable','true');
        $(this).closest("tr").css({'background-color':'lightgrey'});
    }); 

    //make random cell editable and get the row number and col number
      $("#reg-table").on("dblclick", "td", function() {
        $(this).attr('contenteditable','true');
        $(this).css({'background-color':'lightgrey'});
        var row = $(this).closest("tr").index();
        var col = $(this).closest("td").index();
        alert("Row"+row);
        alert("Col"+col);
        
      });

      $("#submit").click(function(e){
        e.preventDefault();
        
        var property = document.getElementById("file").files[0];
        alert(property);
        var file_name = property.name;
        alert(file_name);
        var form_data = new FormData();
        form_data.append("file", property);
        alert(form_data);
        $.ajax({
           type: "POST",
           url: "upload.php",
           data: form_data,
           success: function(data){
               //alert(data);
              alert(data);
                             
           },
           cache: false,
           contentType: false,
           processData: false,
           error: function (request, error) {

               alert(error);
               
           
           }
       });
      });
    
      $("#view_image").click(function(e){
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: "view_file.php",
            success: function(data){
                alert(data.trim());
                $("#image_show").append(data.trim());
                
            },
            error: function (request, error) {
                console.log(error);
                
            
            }
        });

      });

    
})