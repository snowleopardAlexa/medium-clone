import { createCurrentUserHook, createClient } from "next-sanity";
import createImageUrlBuilder from '@sanity/image-url'

export const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: "2021-03-25",
    useCdn: process.env.NODE_ENV === "production",
}

// Set up the client for fetching data in the getProps page function
export const sanityClient = createClient(config)

// to fetch image from sanity - helper function
export const urlFor = (source) => createImageUrlBuilder(config).image(source)

// helper function for using the current logged in user acccount 
export const useCurrentUser = createCurrentUserHook(config)