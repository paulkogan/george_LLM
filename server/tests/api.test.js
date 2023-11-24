import request from "supertest"
// const baseURL= "http://localhost:3003"
import {app} from "../src/app.js"
import {models, sequelize} from "../src/models/index.js"
import {v4  as uuidv4} from "uuid"
const Actor = models.Actor
const Character = models.Character

import {createNewActor, clearActorTable, findActorByNames} from "../src/domain/actor.service.js"
import {createNewRole, clearRoleTable} from "../src/domain/role.service.js"
import {clearMovieTable} from "../src/domain/movie.service.js"
import {loader_main, load_chars, load_movies, load_actors, load_roles}  from "../src/services/loader.js"

let test_actor_1 = {
	"first_name": "Matt",
	"last_name": "Damon",
	"image_url": "www.image.com/matt_damon",
}

let test_movie_1 = {
	"title": "Good Will Hunting",
	"global_box_office": 1000000,
	"release_year": 1997,
	"synopsis": "Working class math genius solves equation"	
}

let test_character_1 = {
    "name": "Will Hunting", 
    "civilian": "Will Hunting",
    "gender": "male", 
    "character_type": "genius human",
    "powers": "math,apples"
}



describe("Testing Loader and GET from endpoints", () => {
	beforeAll(async () => {

		await sequelize.sync({ force: true }) // clear DB
		await load_chars()
		await load_movies()
		await load_actors()
		await load_roles()
		const createActorResponse = createNewActor(test_actor_1)

	})

	it("should return ACTORS list of 11", async () => {
		const response = await request(app).get("/actors")
		expect(response.statusCode).toBe(200)
		expect(response.body.errors).toBe(null)
		expect(response.body.data.length).toBe(11)
	})
    
	it("should filter ACTORS list by query string", async () => {
		const response = await request(app).get("/actors?name=Damon")
		expect(response.statusCode).toBe(200)
		expect(response.body.errors).toBe(null)
		expect(response.body.data.length).toBe(1)
		expect(response.body.data[0].first_name).toBe("Matt")
	})
    
	it("should return MOVIES list of 30", async () => {
		const response = await request(app).get("/movies")
		expect(response.statusCode).toBe(200)
		expect(response.body.errors).toBe(null)
		expect(response.body.data.length).toBe(30)
	})
    
	it("should filter MOVIES list by query string", async () => {
		const response = await request(app).get("/movies?title=Spider")
		// console.log("SPIDER LIST  ============\n",JSON.stringify(response.body.data, null,4))
		expect(response.statusCode).toBe(200)
		expect(response.body.errors).toBe(null)
		expect(response.body.data.length).toBe(3)
		expect(response.body.data[0].title).toBe("Spider-Man: Homecoming")
	})

	it("should return CHARACTERS list of 10", async () => {
		const response = await request(app).get("/characters")
		expect(response.statusCode).toBe(200)
		expect(response.body.errors).toBe(null)
		expect(response.body.data.length).toBe(10)
	})
    
	it("should filter CHARACTERS list by query string", async () => {
		const response = await request(app).get("/characters?name=Captain")
		// console.log("CHAR LIST  ============\n",JSON.stringify(response.body.data, null,4))
		expect(response.statusCode).toBe(200)
		expect(response.body.errors).toBe(null)
		expect(response.body.data.length).toBe(2)
		expect(response.body.data[0].civilian).toBe("Steve Rogers")
	})

	it("should return included ROLES info", async () => {
		const response = await request(app).get("/movies")
		const roles = response.body.data[0]["movie-roles"]
		const first_mov = response.body.data[0]
		console.log("Roles for Iron Man  ============\n",JSON.stringify(first_mov, null,4))
		expect(roles.length).toBe(2)
		expect(roles[0]["role-character"]["civilian"]).toBe("Tony Stark")
	})



})

// describe("POST /findUser", () => {

// 	const find_params = {"email":"matt@damon.com"}
// 	const not_find_params = {"email":"not@there.com"}

// 	it("should return found target user", async () => {
// 		const response = await request(app).post("/users/find_user").send(find_params)
// 		//console.log("FIND USER RESPONSE ============\n",response.body.data, null,4)
// 		expect(response.body.data.name).toBe("Matt Damon")
// 		expect(response.statusCode).toBe(200)
// 		expect(response.body.errors).toBe(null)
// 	})

// 	it("should return 404 if not found", async () => {
// 		const response = await request(app).post("/users/find_user").send(not_find_params)
// 		// console.log("NOT FOUND RESPONSE ============\n",response.body, null,4)
// 		expect(response.statusCode).toBe(404)
// 		expect(response.body.errors).toContain("Did not find user with")

// 	})

// })

// describe("GET /products", () => {
// 	beforeAll(async () => {
// 		await Product.createNew(test_product_1)
// 		await Product.createNew(test_product_2)
// 		await Product.createNew(test_product_3)
// 	})

// 	afterAll(async () => {
// 	})

    
// 	it("should return list of all products in the catalog", async () => {
// 		const response = await request(app).get("/products")
// 		// console.log("product list ==========\n"+JSON.stringify(response.body,null,4))
// 		expect(response.statusCode).toBe(200)
// 		expect(response.body.errors).toBe(null)
// 		expect(response.body.data.length).toBe(3)
// 		expect(response.body.data[0].price).toBe(10000)
// 	})
// })



// describe("POST /products/create", () => {


// 	beforeAll(async () => {
// 		// // clear DB
// 		// await sequelize.sync({ force: true })
// 		// Product.createNew(test_product_1)
// 		// Product.createNew(test_product_2)
// 	})
    
// 	afterAll(async () => {
// 		//await db.sequelize.close()
// 	})

// 	it("should properly add a new product", async () => {
// 		const response = await request(app).post("/products/create").send(test_product_4)
// 		// console.log("new product create============\n",JSON.stringify(response.body, null,4))
// 		expect(response.statusCode).toBe(201)
// 		expect(response.body.errors).toBe(undefined)
// 		expect(response.body.data.name).toBe("F-18-D")
// 		expect(response.body.data.inventory).toBe(12)
// 	})
    

// 	it("should return 400 if bad data", async () => {
// 		const response = await request(app).post("/products/create").send(bad_product_4)
// 		// console.log("BAD product RESPONSE ============\n",JSON.stringify(response.body, null,4))
// 		expect(response.statusCode).toBe(400)
// 		expect(response.body.message).toContain("price must be >= 0 but is")
// 	})

// 	it("should return 400 if duplicate", async () => {
// 		const response = await request(app).post("/products/create").send(test_product_3)
// 		//console.log("DUPLICATE product RESPONSE ============\n",JSON.stringify(response.body, null,4))
// 		expect(response.statusCode).toBe(400)
// 		expect(response.body.message).toContain("Duplicate product")
// 	})


// })



// describe("POST /users/register ", () => {

// 	beforeAll(async () => {
// 		// await sequelize.sync({ force: true }) //clear User
// 		// User.registerNew(test_user_3)
// 		// User.registerNew(test_user_4)

// 	})

// 	afterAll( () => {
// 		sequelize.close()
// 	})

// 	it("should properly register a valid new user return 201", async () => {
// 		const response = await request(app).post("/users/register").send(test_user_3)
// 		// console.log("REGISTER user RESPONSE 201============\n",JSON.stringify(response.body, null,4))
// 		expect(response.statusCode).toBe(201)
// 		expect(response.body.errors).toBe(undefined)
// 		expect(response.body.data.name).toBe("Paul Kogan")
// 		expect(response.body.data.home_state).toBe("NY")
// 	})
    

// 	it("should return 400 if invalid email format", async () => {
// 		const response = await request(app).post("/users/register").send(bad_test_user)
// 		// console.log("BAD REGISTER RESPONSE ============\n",JSON.stringify(response.body, null,4))
// 		expect(response.statusCode).toBe(400)
// 		expect(response.body.message).toContain("invalid email")
// 	})
    
// 	it("should return 400 if duplicate user", async () => {
// 		const response = await request(app).post("/users/register").send(test_user_3)
// 		// console.log("DUPLICATE USER RESPONSE ============\n",JSON.stringify(response.body, null,4))
// 		expect(response.statusCode).toBe(400)
// 		expect(response.body.message).toContain("Validation error")
// 	})
    



// })
