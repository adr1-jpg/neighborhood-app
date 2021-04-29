$(document).ready(function(){

    display_products(products);

})

var display_products = function(product){
    var counter = 0;
    $.each(products, function(i, product){
        if(product["mark_as_deleted"]==false && counter<5){
            var a = document.createElement("a");
            var a = $("<a href='view/"+product["id"]+"'></a>");
            
            var row = $("<div class='row bottom_row_padding'>");
            
            var prod = $("<div href='view/"+product["id"]+"' class='col-md-3 card shadow'>");
            $(prod).append(a);

            $(prod).css({
                "margin-right": "2.5em",
                "margin-left": "2.5em",
                "margin-bottom": "3em",
                "border-color": "#F5F5F5", 
                "border-width":"1px", 
                "border-style":"solid",
                "border-radius": "5px",
                "padding": "0px"});
                
            const image = document.createElement("img");
            image.src = product["img"];
            $(image).attr('alt', "Picture of a person " + product["skill"]);
            image.classList.add("card-img-top");
            $(a).append(image);

            
    
            const skill = document.createElement("p");
            $(skill).css({
                "padding-left": "1em",
                "padding-top": "1em",
                "margin-bottom": "0"
            })
            skill.innerHTML = product["skill"];
            //skill.style.color = "#264653"
            skill.style.fontWeight = "550"
            skill.style.fontSize = "large"
            $(prod).append(skill);

            const name = document.createElement("p");
            name.innerHTML = product["name"];
            $(name).css({
                "padding-left": "1.4em",
            })
            //name.style.fontWeight = "300"
            
            
            const location = document.createElement("p");
            location.innerHTML = product["city"]
            $(location).css({
                "padding-left": "1.4em",
                "margin-bottom": "0",
                //"font-size": "1em",
                "color": "gray"
            })
            location.style.fontSize = "small"
            name.style.fontSize = "small"
            //location.style.fontWeight = "300"
            $(prod).append(location);
            $(prod).append(name);

            $(row).append(prod);

            $("#postings").append(prod);
        }
        counter+=1;
  
    })
}

var reroute_search = function() {
    var input = $.trim( $("#enter_skill").val() );
    console.log("reroute")
    $.ajax({
        type: 'POST',
        //post data to create method in server.py and save it to database
        url: '', 
        // data to be sent to server
        data: JSON.stringify({"search":input}),
        dataType: 'json',
        contentType: 'application/json; charset-utf-8',
        //excuted when AJAX runs
        success: function(result){
            let data = result;
            console.log(data);
        },
        error: function(request, status, error){
            console.log('Error');
            console.log(request);
            console.log(status);
            console.log(error);
        }

    });
}