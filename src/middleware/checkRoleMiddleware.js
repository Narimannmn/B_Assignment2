const checkRoleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        const userRole = req.session.role;
        if (userRole === requiredRole || userRole === 'Admin') {
            next();
        } else {
            res.status(404).render("error", {title: "404", type: "User error", text: "Not sign in"});

        }
    };
};

module.exports = checkRoleMiddleware;