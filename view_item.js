$(document).ready(function(){

    display_item(id, products)	
    
    $( "#enter-skill" ).autocomplete({
        source: skills
    });

})

var display_item = function (id, product){
    $.each(products, function(i, product){
        
        if (product['id'] == id && product["mark_as_deleted"]==false){
            
            var row1 = $("<div id='item' class='row bottom_row_padding'>")

            img_col = $("<div class='col-md-6'>")
            const image = document.createElement("img")
            image.src = product["img"]
            image.style.borderRadius = ".5%"
            image.style.width = "30em"
            $(image).attr('alt', product["skill"] + " picture");
            $(img_col).append(image)
            $(row1).append(img_col)


            var col1 = $("<div class='col-md-6'>")
            const skill = document.createElement("p")
            skill.innerHTML = product["skill"]
            skill.style.fontSize = "2em"
            skill.style.fontWeight = "620"
            $(col1).append(skill)
            

            var row2 = $("<div id='item' class='row bottom_row_padding'>")

            var name_col = $("<div class='col-md-12'>")
            const name = document.createElement("p")
            name.innerHTML = "<b>Posted by:</b> " + product["name"]
            $(col1).append(name)
            var button_row = $("<divclass='row bottom_row_padding'>")
            var col3 = $("<div class='col-md-12'>")
            const location = document.createElement("p")
            location.innerHTML = "<b>Town:</b> " + product["city"]
            $(col1).append(location)
            $(row1).append(col1)
            var summary = $("<div class='row' ></div>")
            var txt = $('<p class="col-8" contentEditable=true id="txt">'+product['summary']+'</p>')
            
            $(summary).append(txt);

            var curr_txt
            var update_button = $('<button type="submit" id="update" class="btn btn-sm btn-outline-primary col-2">Edit</button>')
            $(update_button).css({"margin": "1.2em"});
            var discard_button = $('<button type="submit" id="discard" class="btn btn-sm btn-danger">Discard</button>')
            var submit_button = $('<button type="submit" id="update" class="btn btn-sm btn-success">Submit</button>')
            $(submit_button).css({"margin": "1.2em"});
            $(discard_button).css({"margin": "1.2em"});
            $(summary).css({"font-size": "1em"});
            $(txt).css({"margin-bottom": "0"});
            $(summary).append(update_button)
            var original_summary = $.trim(product["summary"]);


            $(update_button).click(function(){
                event.preventDefault();
                update_button.hide();
                $('#txt').focus();
    
                $(button_row).append(discard_button)

                $(button_row).append(submit_button)
                $(summary).append(button_row)
                
                
            })
            $(discard_button).click(function(){
                event.preventDefault();
                product["summary"] = original_summary;
                edit_input(product);
            });

            $(submit_button).click(function(){
                curr_txt = $('#txt').text();
                product["summary"] = $.trim(curr_txt)
                console.log(product["summary"])
                edit_input(product);
            });
            
            $(summary).on('input', ':text', function(){
                $(this).val();
            })
            console.log(summary)
            var col10 = $("<div class='col-4'>")
            $(col1).append(summary)
            $(row1).append(col1)
            $(row1).append(col10)

            var col6 = $("<div class='col-md-12'>")
            const email = document.createElement("p")
            email.innerHTML = "<b>Email</b>: " + product["email"]
            $(col1).append(email)
            $(row1).append(col6)

            var col7 = $("<div class='col-md-12'>")
            const days = document.createElement("p")
            $(days).append('<span"> <b>Availbility:</b> </span>');
            listOfDates=[];
            $.each(product["days"],function(index,value){ 
                if(index>0)
                    $(days).append('<span> </span>');
                console.log(value)
                if (value["mark_as_deleted"]==false){
                    listOfDates.push(value["day"]);
                    $(days).append('<span id="enter_days'+index+'">'+value["day"]+'</span>');
                }
                
            }); 

            //DELETE DROPDOWN
            var dropdown = $("<div  class='dropdown'></div>");
            
            var edit_dates = $("<button class='btn btn-outline-danger text-danger btn-secondary btn-sm col-md-4 dropdown-toggle'>Delete Dates</button>")
            $(edit_dates).css({"background-color": "white"});
            
            $(dropdown).append(edit_dates);
            var dropdownMenu = $('<div id="dropDown"class="dropdown-menu" aria-labelledby="dropdownMenuButton">');
            $(dropdown).append(dropdownMenu)
            var i = 1;
            for (const val of listOfDates) {
                var dropdownItem = $('<a id="dropdown-item'+i+'"class="dropdown-item" href="">'+val+'</a>');
                dropdownMenu.append(dropdownItem);
                i+=1;
            }
            undo = $("<div id='undo-deletion'></div>")
            $(edit_dates).click(function(){
                event.preventDefault()
                $('.dropdown-menu').toggleClass('show');
                $('.dropdown-item').click(function(){
                    event.preventDefault();
                    current_id = this.id;
                    var selectedDay = $("#"+current_id).text().trim()
                    delete_date(selectedDay, product);
                });
            })
            
            console.log(days)
            $(col1).append(days)
            $(col1).append(dropdown);
            $(col1).append(undo)
            //$(row1).append(col7)

            $("#item-info").append(row1)

        }

    })
}


var delete_date = function(day, product){

    $.ajax({
        type: 'POST',
        url: '/view/<id>',
        data: JSON.stringify({"day": day, "mark_as_deleted": false, "id": product["id"]}),
        dataType: 'json',
        contentType: 'application/json; charset-utf-8',
        success: function(result){
            console.log(result)
            console.log(product["days"])

            $.each(product["days"],function(index,value){ 
                if(value["day"]==day)
                    value["mark_as_deleted"]=true
                
            }); 
            document.getElementById("item-info").innerHTML = ""
            document.getElementById("undo-deletion").innerHTML = "";
            display_item(product["id"], products);
            
            var button = document.createElement("button");
            button.innerHTML = "Undo";

            undo_date = $('<button type="submit" id="update" class="btn btn-sm btn-danger">Undo </button>')

            $(undo_date).css({"margin-top": "1.2em"});
            $("#undo-deletion").append(undo_date);
            button.setAttribute("id", "undo");
            $(undo_date).click(function(){
                event.preventDefault();
                undo_delete_date(day, product);
            })

        },
        error: function(request, status, error){
            console.log('Error');
            console.log(request);
            console.log(status);
            console.log(error);
        }

    });
}

var undo_delete_date = function(day, product){
    $.ajax({
        type: 'POST',
        url: '/view/<id>',
        data: JSON.stringify({"day": day, "mark_as_deleted": true, "id": product["id"]}),
        dataType: 'json',
        contentType: 'application/json; charset-utf-8',
        success: function(result){
            document.getElementById("item-info").innerHTML=""
            document.getElementById("undo-deletion").innerHTML=""
            $.each(product["days"],function(index,value){ 
                if(value["day"]==day)
                    value["mark_as_deleted"]=false
                
            }); 
            console.log(products)
            $("#item-info").innerHTML = ""
            display_item(product["id"], products)
        },
        error: function(request, status, error){
            console.log('Error');
            console.log(request);
            console.log(status);
            console.log(error);
        }

    });
}

var edit_input = function(product){
    
    var new_input = $.trim(product["summary"]);
    var no_error = true;
    if (new_input == ""){
        $("#edit_warning").append('<div class="warning">New input cannot be empty</div>');
        no_error = false;
        $("#edit_summary").focus();
    }
    console.log(new_input);
    $.ajax({
        type: 'POST',
        url: '/view/<id>',
        data: JSON.stringify({"id": product["id"], "new_input": new_input}),
        dataType: 'json',
        contentType: 'application/json; charset-utf-8',
        success: function(result){
            let data = result;
            console.log(data);
            product["summary"] = new_input;
            document.getElementById("item-info").innerHTML = ""
            display_item(product["id"], products);
        },
        error: function(request, status, error){
            console.log('Error');
            console.log(request);
            console.log(status);
            console.log(error);
        }

    });
    }