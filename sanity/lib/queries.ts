import { defineQuery } from "next-sanity";

const chroniqueFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Sans titre"),
  "slug": slug.current,
  "date": coalesce(publishedAt, _createdAt),
  "coverImage": coverImage,
  "rating": rating,
  "author": author->{"name": coalesce(name, "Cyril"), picture},
  "excerpt": array::join(string::split(pt::text(body), "")[0...200], "") + "...",
  spotifyUrl
`;

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

export const heroQuery = defineQuery(`
  *[_type == "chronique" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc) [0] {
    body,
    ${chroniqueFields}
  }
`);

export const moreStoriesQuery = defineQuery(`
  *[_type == "chronique" && _id != $skip && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc) [0...$limit] {
    ${chroniqueFields}
  }
`);

export const postQuery = defineQuery(`
  *[_type == "chronique" && slug.current == $slug][0] {
    ...,
    ${chroniqueFields},
    body
  }
`);