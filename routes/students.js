import express from 'express'
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Get students')
})
router.get('/:id',(req, res) => {
    res.send('Get detail student by id:' + req?.params?.id ?? "")
})
router.post('/:id',(req, res) => {
    res.send('Post insert student')
})
export default router;