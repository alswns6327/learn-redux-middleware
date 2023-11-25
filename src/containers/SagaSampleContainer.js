import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import SagaSample from '../components/SagaSample';
import { getPost, getUsers } from '../modules/sagaSample';

const SagaSampleContainer = ({
    getPost,
    getUsers,
    post,
    users,
    loadingPost,
    loadingUsers
}) => {
    // 클리새 형태 컴포넌트였다면 componentDidMount
    useEffect(()=>{
        const fn = async () => {
            try{
                await getPost(1);
                await getUsers(1);
            }catch(e){
                console.log(e);
            }
        }
        fn();
    }, [getPost, getUsers]);
    return (
        <SagaSample
            post={post}
            users={users}
            loadingPost={loadingPost}
            loadingUsers={loadingUsers}
        />
    );
};

export default connect(
    ({sagaSample, loading}) => ({
        post: sagaSample.post,
        users: sagaSample.users,
        loadingPost : loading['sagaSample/GET_POST'],
        loadingUsers : loading['sagaSample/GET_USERS']
    }),
    {
        getPost,
        getUsers
    }
)(SagaSampleContainer);