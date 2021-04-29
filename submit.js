day_count = 1

$(document).ready(function(){

    //nav bar autocomplete
    $( "#enter-skill" ).autocomplete({
        source: skills
    });

    //submit button
   $("#submit").click(function(){
        event.preventDefault()
        $("#success").innerHtml = ""
        $("#view-button").innerHtml = ""
        save_skill()
    })

    $("#add_date").click(function(){
        event.stopImmediatePropagation(); 
        event.preventDefault()
        add_input();
    })

})



function add_input(){
    var input = $('<br><input type="text" id="enter_days'+day_count+'"  name="enter_days'+day_count+'" class="form-control col-6" placeholder=" Date available">')
    
    $("#dates").append(input)
    $("#dates").append('<div class="warning_div'+day_count+'" id="days_warning'+day_count+'"></div>')
    day_count+=1
}


var save_skill = function(){
    // remove all warnings
    $(".warning").empty()
    var img = $.trim( $("#enter_img").val() )
    var name = $.trim( $("#enter_name").val() )
    var city = $.trim( $("#enter_city").val() )
    var skill = $.trim( $("#enter_skills").val() )
    var summary = $.trim( $("#enter_summary").val() )
    var email = $.trim( $("#enter_email").val() );
    var date1 = $.trim( $("#enter_days").val() );
    var mark_as_deleted = false;
    var no_error = true;
    dates = [];
    // check for empty fields
    if (name == ""){
        $("#name_warning").append('<div class="warning">Name cannot be empty</div>')
        no_error = false
        $("#enter_name").focus()
    }
    if (email == ""){
        $("#email_warning").append('<div class="warning">Name cannot be empty</div>')
        no_error = false
        $("#enter_email").focus()
    }
    if (img == ""){
        $("#img_warning").append('<div class="warning">Img cannot be empty</div>')
        no_error = false
        $("#enter_img").focus()
    }
    if (city == ""){
        $("#city_warning").append('<div class="warning">Town cannot be empty</div>')
        no_error = false
        $("#enter_city").focus()
    }
    if (skill == ""){
        $("#skill_warning").append('<div class="warning">Skill cannot be empty</div>')
        no_error = false
        $("#enter_skills").focus()
    }
    if (summary == ""){
        $("#summary_warning").append('<div class="warning">Summary cannot be empty</div>')
        no_error = false
        $("#enter_summary").focus()
    }
    if (date1 == ""){
        $("#days_warning").append('<div class="warning">Days cannot be empty</div>')
        no_error = false
        $("#enter_days").focus()
        
    }
    
    
    sectionOfDates = document.querySelector("#dates");
    listOfDates = sectionOfDates.querySelectorAll(".form-control");

    $(listOfDates).each(function (i){
        var curr_input = $.trim( $(listOfDates[i]).val() )
        console.log(curr_input)
        if (curr_input == ""){
            $("#days_warning"+i).append('<div class="warning">Days cannot be empty</div>')
            no_error = false
            $("#enter_days"+i).focus()
            
        }
        else{
            dict = {"day": curr_input, "mark_as_deleted": false}
            dates.push(dict)
        }  
    });

    
    console.log(dates);

    if(no_error==true){
        skillObject = {
            "name": name,
            "img": img,
            "city": city,
            "skill": skill,
            "summary": summary,
            "days": dates,
            "email": email,
            "mark_as_deleted": mark_as_deleted
            }
    
        $.ajax({
            type: 'POST',
            //post data to create method in server.py and save it to database
            url: 'create', 
            // data to be sent to server
            data: JSON.stringify(skillObject),
            dataType: 'json',
            contentType: 'application/json; charset-utf-8',
            //excuted when AJAX runs
            success: function(result){
                console.log(result)
                $("#success").append("<h2>Post added Successfully</h2>")
                let data = result['products'];
                console.log(data)
                updatedData = data
                console.log(data.length)
                var a = document.createElement("a")
                var a = $("<a href='view/"+data.length+"'></a>")
                
                var row = $("<div class='row bottom_row_padding'>")

                var view = $("<button class='btn btn-success' href='view/"+data.length+"' class='col-md-3'>View</button>")
                $(a).append(view)
                $("#view-button").append(a)
            

                $("#enter_name").val("")
                $("#enter_city").val("")
                $("#enter_skill").val("")
                $("#enter_img").val("")
                $("#enter_email").val("")
                $("#enter_days").val("")
                $("#enter_summary").val("")
                $("#enter_name").focus()
                $(listOfDates).each(function (i){
                    var curr_input = $.trim( $(listOfDates[i]).val() )
                    $("#enter_days"+i).remove();

                });
            
                //if it's a new skill, add to skills list
                if( $.inArray(skill, skills) < 0){
                    skills.push(skill)	
                    
                }
                if( $.inArray(city, cities) < 0){
                    cities.push(city)	
                    
                }
            },
            error: function(request, status, error){
                console.log('Error');
                console.log(request);
                console.log(status);
                console.log(error);
            }

        });
    }      
}
