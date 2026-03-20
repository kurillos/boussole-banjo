import { defineQuery } from "next-sanity";

// On définit les champs que l'on veut récupérer pour chaque chronique
// On ajoute "rating" et on s'assure que "date" utilise "publishedAt"
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

// On change "_type == 'post'" par "_type == 'chronique'"
export const heroQuery = defineQuery(`
  *[_type == "chronique" && defined(slug.current)] | order(date desc, _createdAt desc) [0] {
    body,
    ${chroniqueFields}
  }
`);

export const moreStoriesQuery = defineQuery(`
  *[_type == "chronique" && _id != $skip && defined(slug.current)] | order(date desc, _createdAt desc) [0...$limit] {
    ${chroniqueFields}
  }
`);

export const postQuery = defineQuery(`
  *[_type == "chronique" && slug.current == $slug] [0] {
    body,
    ${chroniqueFields}
  }
`);