import React, { useState, useEffect } from "react";
import Link from '../components/Link/Link';
import List from "../components/List/List";
import styled from "styled-components";

const ProfileContainer = styled.div`
width: 50%;
margin: 10px auto;
`;

const ProfileAvatar = styled.img`
width: 190px;
`;

const Profile = () => {
    const [data, setData] = useState({});
    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        try {
            const fetchData = async () => {
                const profile = await fetch('https://api.github.com/users/octocat');
                const profileJSON = await profile.json();

                if (profileJSON) {
                    const repositories = await fetch(profileJSON.repos_url);
                    const repositoriesJSON = await repositories.json();
                    setData(profileJSON);
                    setRepositories(repositoriesJSON);
                    setLoading(false);
                    console.log('success')
                }
            }
            fetchData()
        }
        catch (error) {
            setLoading(false);
            setError(error.message);
        }

    },
        [])

    if (loading || error) {
        return <div>{loading ? 'Loading...' : error}</div>;
    }


    const items = [
        {
            label: 'html_url', value: <Link url={data.html_url}
                title='Github URL' />
        },
        { label: 'repos_url', value: data.repos_url },
        { label: 'name', value: data.name },
        { label: 'company', value: data.company },
        { label: 'location', value: data.location },
        { label: 'email', value: data.email },
        { label: 'bio', value: data.bio }
    ]

    const projects = repositories.map(repository => ({
        label: repository.name,
        value: <Link url={repository.html_url} title='Github URL' />
    }));


    return (
        <ProfileContainer>
            <ProfileAvatar className='Profile-avatar' src={data.avatar_url} alt='avatar' />
            <List title='Profile' items={items} />
            <List title='Projects' items={projects} />
        </ProfileContainer>
    )
}
export default Profile;