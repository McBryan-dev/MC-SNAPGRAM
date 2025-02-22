import React from 'react';
import {Models} from 'appwrite';
import Loader from '@/components/shared/Loader.tsx'
import GridPostList from './GridPostList.tsx'

type SearchResultsProps = {
    isSearchFetching: boolean;
    searchedPosts: Models.Document[];
}

const SearchResults = ({isSearchFetching, searchedPosts}) => {
    if(isSearchFetching) return <Loader />

    if(searchedPosts && searchedPosts.documents.length > 0){
        return (
            <GridPostList posts={searchedPosts.documents} />
        )
    } 


    return (
        <p className="text-light-4 mt-10 text-center w-full">
            NO RESULTS FOUND
        </p>
    )
}

export default SearchResults;