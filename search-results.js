
$(document).ready(function(){
    count = 0
    $("#search-results").innerHTML = "";
    $( "#enter_skill" ).autocomplete({
        source: total
    });
    count = 0
    for (i in results){
        count+=1
    }

    display_search(results)
});

var display_search = function(product){
    if (results==[]){
        $("#count").html("");
        $("#search-results").innerHTML = "";
        console.log("inside here")
        $("#search-results").append('<div class="warning">No results</div>');
    }
    else{
        var row1 = $("<div class='row bottom_row_padding'>");
        var results = $("<div>");
        results.innerHTML = count;
        c = document.createElement("h4");
        c.innerHTML = "Results: " + count;
        

        $("#count").append(c);
        $.each(product, function(i, product){

            
            var a = document.createElement("a");
            var a = $("<a href='view/"+product["id"]+"'></a>");
            
            var row = $("<div class='row bottom_row_padding'>");

            var prod = $("<div href='view/"+product["id"]+"' class='col-md-3 card shadow-md'>");
            $(prod).append(a);
            $(prod).addClass("shadow")
            $(prod).css({
                "margin-right": "2.5em",
                "margin-left": "2.5em",
                "border-color": "#F5F5F5", 
                "border-width":"1px", 
                "border-style":"solid",
                "border-radius": "5px",
                "padding": "0px"});
                
            const image = document.createElement("img");
            image.src = product["img"];
            
            image.classList.add("card-img-top");
            $(image).attr('alt', product["skill"] + " picture");
            $(a).append(image);

            
            
            const skill = document.createElement("p");
            $(skill).css({
                "padding-left": "1em",
                "padding-top": "1em"
            })
            var curr_prod = product["skill"].toLowerCase()
            var curr_input = input_search["input"]
            var start;
            var end;
            var match;
            skill.innerHTML = "<b>Skill</b>: "
            console.log(curr_input)
            console.log(curr_prod)
            if(curr_prod.includes(curr_input)){
                var match = "skill"
                var output_skill =""
                start = curr_prod.indexOf(curr_input)
                end = (start + curr_input.length)-1
                console.log(start)
                console.log(end)
                if (start!=0){
                    output_skill+=curr_prod.slice(0, start)
                    output_skill+="<mark>" + curr_prod.slice(start, end+1) + "</mark>"
                    output_skill+=curr_prod.slice(end+1)
        
                }
                if (start==0){
                    output_skill+="<mark>" + curr_prod.slice(start,end+1) + "</mark>"
                    output_skill+= curr_prod.slice(end+1)
                }
                skill.innerHTML = output_skill
            }
            else{
                output_skill=""
                skill.innerHTML = product["skill"]
            }
            $(prod).css({
                "margin-bottom": "2em",

            })
            $(prod).append(skill);
            skill.style.fontWeight = "550"
            skill.style.fontSize = "large"
            $(skill).css({
                "margin-bottom": "1",
        
            })
            const name = document.createElement("p");
            name.innerHTML =  product["name"];
            $(name).css({
                "padding-left": "1em",
                "margin-bottom": "1"
        
            })
            $(prod).append(name);
            var curr_prod = product["city"].toLowerCase()
            const location = document.createElement("p");
            var curr_city = product["city"].toLowerCase()
            if(curr_city.includes(curr_input)){
                var match = "city"
                var output_city =""
                start = curr_prod.indexOf(curr_input)
                end = (start + curr_input.length)-1
                console.log(start)
                console.log(end)
                if (start!=0){
                    output_city+=curr_prod.slice(0, start)
                    output_city+="<mark>" + curr_prod.slice(start, end+1) + "</mark>"
                    output_city+=curr_prod.slice(end+1)
                    console.log(output_city)
        
                }
                if (start==0){
                    output_city+="<mark>" + curr_prod.slice(start,end+1) + "</mark>"
                    output_city+= curr_prod.slice(end+1)
                }
                console.log(output_city)
                location.innerHTML = output_city
            }
            else{
                location.innerHTML = product["city"]
            }
            
            $(location).css({
                "padding-left": "1em",
                "color": "gray"
        
            })
            location.style.fontSize = "small"
            name.style.fontSize = "small"
            $(prod).append(location);
            
            $(row).append(prod);
            $("#search-results").append(prod);
            console.log(match)
            


        });
    }
}