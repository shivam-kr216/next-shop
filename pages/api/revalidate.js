// created a new web hook at strapi
// Now instead of revalidating (ISR) it will detect the changes automatically and regenrate the page
// It is next above 12 v so we are old version to validate data i.e., revalidate option in this course
// Only some CMS support webHooks like strapi for which we can do like this
// First we need to create webhook on CMS then we can add this code
async function handleRevalidate(req, res) {
    console.log('/api/revalidate received', req.body);
    const event = req.body;
    const id = event.entry.id;
    await Promise.all([
        // we need to pass the path at which we want it to update on any chage
        res.revalidate('/'),
        res.revalidate(`/products/${id}`),
    ]);
    console.log(`revalidate received ${id}`);
    res.status(204).end();
}

export default handleRevalidate;