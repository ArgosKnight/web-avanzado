import postService from "../services/post-service.js";

class PostController {

    // LISTAR POSTS
    async getAll(req, res) {
        try {
            const posts = await postService.getPosts();
            res.render("posts", { posts });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    // FORMULARIO CREAR
    async createForm(req, res) {
        res.render("post-create");
    }

    // CREAR POST
    async create(req, res) {
        try {
            const userId = "6924be9e236e24f34f34c1d3"; 
            await postService.createPost(userId, req.body);
            res.redirect("/posts");
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    // FORMULARIO EDITAR
    async editForm(req, res) {
        try {
            const post = await postService.getPost(req.params.id);
            res.render("post-edit", { post });
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    // ACTUALIZAR POST
    async update(req, res) {
        try {
            await postService.updatePost(req.params.id, req.body);
            res.redirect("/posts");
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    // ELIMINAR POST
    async remove(req, res) {
        try {
            await postService.deletePost(req.params.id);
            res.redirect("/posts");
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}

export default new PostController();
