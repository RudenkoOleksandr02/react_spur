import React, {useEffect, useRef, useState} from 'react';
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import {getPagesCount} from "../utils/pages";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/modal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyLoader from "../components/UI/loader/MyLoader";
import PostList from "../components/PostList";
import MyPagination from "../components/UI/pagination/MyPagination";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

const Posts = () => {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modalActive, setModalActive] = useState(false)
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const lastElement = useRef();

    const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(page, limit)
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPagesCount(totalCount, limit))
    })
    const changePage = (page) => {
        setPage(page)
    }

    useObserver(lastElement, page < totalPages, isPostLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModalActive(false)
    }
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className='App'>
            <MyButton
                onClick={() => setModalActive(true)}
                style={{marginTop: 30}}
            >
                Создать пользователя
            </MyButton>
            <MyModal active={modalActive} setActive={setModalActive}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue='Кол элементов на странице'
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'Показать все'},
                ]}
            />
            {postError &&
                <h1>Произошла ошибка {postError}</h1>
            }
            <PostList
                remove={removePost}
                posts={sortedAndSearchedPosts}
                title='Посты про JS'
            />
            <div ref={lastElement} style={{
                background: 'red',
                height: 20
            }}/>
            {isPostLoading &&
                <div style={{display: 'flex', justifyContent: 'center'}}><MyLoader/></div>
            }
            <MyPagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
};

export default Posts;
