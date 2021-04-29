$(document).ready(function(){

    total = []
    $.each(skills, function(i, skill){
        total.push(skill)
    })
    $.each(cities, function(i, city){
        total.push(city)
    })
    console.log(total)
    $( "#enter_skill" ).autocomplete({
        source: total
    });

  

    $("#search-link").click(function(){
        var input = $.trim( $("#enter_skill").val() );
        if (input=="")
            event.preventDefault()
        search_skills();
    })
})


var search_skills = function(){
    var a = document.createElement("a");

    var input = $.trim( $("#enter_skill").val() );
    var name;
    console.log(input)
    var no_error = true;
    if (input == ""){
        $("#reams_warning_div").append('<div class="warning">Skill cannot be empty</div>');
        no_error = false;
    }
    // var match = false;
    input = input.toLowerCase();

    //store in JSON
    if(no_error==true){
        $.ajax({
            type: 'POST',
            //post data to search method in server.py and save it to database
            url: 'search', 
            // data to be sent to server
            data: JSON.stringify({"search":input}),
            dataType: 'json',
            contentType: 'application/json; charset-utf-8',
            //excuted when AJAX runs
            success: function(result){
                let data = result;
                console.log(result.results[0]);
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