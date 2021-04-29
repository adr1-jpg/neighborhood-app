from flask import Flask

from flask import render_template

from flask import request, jsonify

# create an app instance
app = Flask(__name__)

products = [
    {
        "id": 1,
        "img": "https://pbs.twimg.com/media/EkO7va9WkAIZN6o.jpg",
        "name": "Genesis Orantes",
        "city": "Stony Point",
        "skill": "Baking brownies",
        "summary": "I am great at baking the softest, yummiest brownies!",
        "days": [{"day": "3/1", "mark_as_deleted": False},{"day": "3/2", "mark_as_deleted": False} ],
        "email": "adriorantes@gmail.com",
        "mark_as_deleted": False
    },
    {
        "id": 2,
        "img":"https://c.stocksy.com/a/mrN600/z9/1521714.jpg",
        "name": "Isabella Hernandez",
        "city": "Spring Valley",
        "skill": "Riding a bike",
        "summary": "I just learned how to ride a bike and am willing to teach others",
        "days": [{"day": "3/12", "mark_as_deleted": False} ],
        "email": "isabella123@gmail.com",
        "mark_as_deleted": False
    },
    {
        "id": 3,
        "img":"https://www.normans.co.uk/blog/wp-content/uploads/2016/08/AdobeStock_38208031.jpg",
        "name": "Johnny Contreras",
        "city": "New City",
        "skill": "Playing piano",
        "summary": "Can teach someone some intro beginner piano skills.",
        "days": [{"day": "3/13", "mark_as_deleted": False},{"day": "3/16", "mark_as_deleted": False},{"day": "3/18", "mark_as_deleted": False} ],
        "email": "johnnymusic12@gmail.com",
        "mark_as_deleted": False
    },
    {
        "id": 4,
        "img": "https://portcitydaily.com/wp-content/uploads/2019/04/fashion-4013456_1280-e1556290852803.jpg",
        "name": "Angelica Jimenez",
        "city": "Stony Point",
        "skill": "Skateboarding",
        "summary": "Looking for a skateboarding buddy, can teach you how if you dont know how!",
        "days": [{"day": "3/1", "mark_as_deleted": False},{"day": "3/14", "mark_as_deleted": False},{"day": "3/21", "mark_as_deleted": False} ],
        "email": "joe8367@gmail.com",
        "mark_as_deleted": False
    },
    {
        "id": 5,
        "img": "https://avatars.mds.yandex.net/get-zen_doc/3518390/pub_5fb5338c42f9ca1da10ba8b8_5fb6377442f9ca1da140c02b/scale_1200",
        "name": "Jenny Lopez",
        "city": "Oaktown",
        "skill": "Coding",
        "summary": "Pretty good at HTML, CSS, and Javascript if anyone is interested!",
        "days": [{"day": "3/1", "mark_as_deleted": False},{"day": "3/9", "mark_as_deleted": False},{"day": "3/22", "mark_as_deleted": False} ],
        "email": "jennylovescomputers@gmail.com",
        "mark_as_deleted": False
    },
    {
        "id": 6,
        "img": "https://www.singlikeastar.com/wp-content/uploads/2020/03/capture-1200x800.jpg",
        "name": "Katy Perry",
        "city": "Thiells",
        "skill": "Singing",
        "summary": "Can teach someone to sing!",
        "days": [{"day": "3/12", "mark_as_deleted": False},{"day": "3/18", "mark_as_deleted": False}],
        "email": "katyperry@gmail.com",
        "mark_as_deleted": False
    },
    {
        "id": 7,
        "img": "https://philnews.ph/wp-content/uploads/2017/03/Interpretation-of-Artwork-1200x800.jpg",
        "name": "Lily Rivera",
        "city": "Thiells",
        "skill": "Painting",
        "summary": "Would love to have a paint day with someone. Don't worry if you dont know how, I can teach you!",
        "days": [{"day": "3/12", "mark_as_deleted": False},{"day": "3/16", "mark_as_deleted": False},{"day": "3/19", "mark_as_deleted": False} ],
        "email": "lilyrivera@gmail.com",
        "mark_as_deleted": False
    },
    {
        "id": 8,
        "img": "https://www.usnews.com/dims4/USNEWS/e4ded73/2147483647/resize/1200x%3E/quality/85/?url=http%3A%2F%2Fmedia.beam.usnews.com%2Fe2%2F7f%2Fb9f8dce24147b0b536fe7b91df60%2F200928-actingschool-stock.jpg",
        "name": "Selena Gomez",
        "city": "Haverstraw",
        "skill": "Acting",
        "summary": "Can teach some acting skills",
        "days": [{"day": "3/19", "mark_as_deleted": False},{"day": "3/21", "mark_as_deleted": False} ],
        "email": "selenag@gmail.com",
        "mark_as_deleted": False
    },
    {
        "id": 9,
        "img": "https://www.usnews.com/dims4/USNEWS/e4ded73/2147483647/resize/1200x%3E/quality/85/?url=http%3A%2F%2Fmedia.beam.usnews.com%2Fe2%2F7f%2Fb9f8dce24147b0b536fe7b91df60%2F200928-actingschool-stock.jpg",
        "name": "Justin Bieber",
        "city": "Oaktown",
        "skill": "Singing",
        "summary": "Can teach u to sing a song",
        "days": [{"day": "3/2", "mark_as_deleted": False}],
        "email": "jb@gmail.com",
        "mark_as_deleted": False
    },
    {
        "id": 10,
        "img": "https://philnews.ph/wp-content/uploads/2017/03/Interpretation-of-Artwork-1200x800.jpg",
        "name": "Demi Lovato",
        "city": "Oaktown",
        "skill": "Painting",
        "summary": "Bring ur own canvas :)",
        "days": [{"day": "3/1", "mark_as_deleted": False},{"day": "3/4", "mark_as_deleted": False},{"day": "3/6", "mark_as_deleted": False} ],
        "email": "demilovato@gmail.com",
        "mark_as_deleted": False
    }

]

skills = [
    "Baking brownies", 
    "Riding a bike",
    "Playing piano", 
    "Skateboarding",
    "Coding",
    "Painting",
    "Acting"
]

cities = [
    "Haverstraw",
    "Spring Valley",
    "New City",
    "Stony Point",
    "Oaktown",
    "Thiells"
]

current_id = 10

results = []
# create a base route
@app.route('/')
def home():
    return render_template('home-page.html', products=products, skills=skills, cities=cities)
    
@app.route('/view/<id>', methods=['GET','POST'])

def view(id=None):
    global products
    
    if (request.method=="POST"):
        product = request.get_json()
        print(len(product))
        if (len(product)==2):
            edit_id = int(product["id"])
            # find the skill with this id, and store the index to change "mark_as_deleted" value
            print("edit")
            print(edit_id)
            print(products)
            index_of_edit = 0
            for (i, s) in enumerate(products):
                target_id = s["id"]
                print("target")
                print(target_id)
                if target_id == edit_id:
                    index_of_edit = i
                    break
            products[index_of_edit]["summary"]=product["new_input"]
            print(products)
            return jsonify(products=products)
        if (product["mark_as_deleted"]==False):        
            delete_id1 = int(product["id"])
            # find the skill with this id, and store the index to change "mark_as_deleted" value

            for (i, s) in enumerate(products):
                s_id = s["id"]
                if s_id == delete_id1:
                    index_of_date = i
                    break
            #print(products[index_of_date]["days"])
            for date in products[index_of_date]["days"]:
                print(date)
                if date["day"] == product["day"]:
                    date["mark_as_deleted"]=True

            return jsonify(products=products)
        if (product["mark_as_deleted"]==True):
            print("UNDO")
            #global current_id   
            #sale_data["id"] = current_id

            delete_id2 = int(product["id"])
            # find the skill with this id, and store the index to change "mark_as_deleted" value

            for (i, s) in enumerate(products):
                s_id = s["id"]
                print(s["id"])
                if s_id == delete_id2:
                    index_of_date2 = i
                    break

            #change "mark_as_deleted" value to True
            for date in products[index_of_date2]["days"]:
                print(date)
                if date["day"] == product["day"]:
                    date["mark_as_deleted"]=False
            return jsonify(products=products)
    return render_template('view-item.html', id=id, products=products, skills=skills, cities=cities)

@app.route('/create', methods=['GET','POST'])

def create():
  global products
  global current_id
  request_data = request.get_json() 
  if (request.method=="POST"):
    img = request_data['img']
    name = request_data['name']
    city = request_data['city']
    skill = request_data['skill']
    summary = request_data['summary']
    days = request_data["days"]
    email = request_data["email"]
    deleted = request_data["mark_as_deleted"]

    current_id = current_id + 1
    new_id = current_id

    new_product_entry = {
        "id": new_id,
        "img": img, 
        "name": name,
        "city": city,
        "skill": skill,
        "summary": summary,
        "days": days,
        "email": email,
        "mark_as_deleted": deleted
    }
    print(days)
    if (skill not in skills):
        skills.append(skill)
    if (city not in cities):
        cities.append(city)
    print(products)
    products.insert(0, new_product_entry)
    print(products)
    return jsonify(products = products, skills = skills)
  return render_template('create.html', skills=skills, products=products, cities=cities)

@app.route('/delete', methods=['GET','POST'])
def delete():
    print("delete_skill")
    global products
    #global current_id   


    product = request.get_json()
    print(product)
    #sale_data["id"] = current_id
    
    delete_id = int(product["id"])
    print(delete_id)

    # find the sales record with this id, and delete it.
    index_to_delete = None
    for (i, s) in enumerate(products):
        s_id = s["id"]
        print(s["id"])
        if s_id == delete_id:
            print("found it: ")
            print(i, s)
            index_to_delete = i
            
            break


    if index_to_delete is not None:
        print("deleting: ", index_to_delete)
        s["mark_as_deleted"] = True
    
    print("new products array")
    print(products)
    return jsonify(products=products)

@app.route('/search', methods=['GET', 'POST'])
def search():
    if(request.method=="POST"):
        global skills
        global products
        global cities
        global search
        global results
        global input_search
        results = []
        
        request_data = request.get_json()
        print(request_data)
        #name=request_data["search"]

        target = request_data["search"].lower()
        input_search = {"input": request_data["search"]}
        for item in products:
            s = item["skill"].lower()
            if ((target in s) or (s in target)):
                if(item not in results):
                    results.append(item)
        for item in products:
            s = item["city"].lower()
            if ((target in s) or (s in target)):
                if(item not in results):
                    results.append(item)     
        return jsonify(results=results, input_search=input_search)
    #print(input_search)
    results_no_dups = []
    for i in results:
        if i not in results_no_dups:
            results_no_dups.append(i)

    results = results_no_dups
    return render_template('search-results.html', results=results,input_search=input_search, products=products, skills=skills, cities=cities)