# <p style="color:#FF3F1A; width:100%; background-color: #27272A; border-radius: 0.5rem; padding: 0.5rem 1rem;">FE - NVB Blogs</p>

The blogs infomation on the NVBPlay store.

## Demo

[Demo](https://nvbplay-storefront.vercel.app/)

## Deployment

[Deployment](https://www.google.com)

## Dev Install

**Please use Yarn instead of Npm to contact modules packages:**

```bash
yarn install
```

or

```bash
yarn
```

**Start cmd**

```bash
yarn start
```

**Build cmd**

```bash
yarn build
```

## Preview

![Logo](https://res.cloudinary.com/dubi5n4bw/image/upload/v1733799883/logos/hfqdk9aabuzzomme7qpz.png)

## Tech Stack

**FE:** TypeScript, React, Next.js, Tailwindcss(combine with UI Library/Kit)

## Mock Data

To use fake data for development, set the following environment variable in your `.env` file:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api/mock
```

The mock API is handled by a catch-all route at `src/app/api/mock/[...path]/route.ts` and uses data from `src/mocks/db.json`.

To switch back to the real API, use the production/development URL:

```bash
NEXT_PUBLIC_API_URL=https://nestjs-ecommerce-hub-develop.up.railway.app
```

<!-- ## Colors
| Color                   | Hex                                                                |
| ----------------------  | ------------------------------------------------------------------ |
| txtprimary | ![#27272A](https://via.placeholder.com/10/27272A?text=+) #27272A |
| txtsecondary |  ![#64646D](https://via.placeholder.com/10/64646D?text=+) #64646D |
| txtthird | ![#FF3F1A](https://via.placeholder.com/10/FF3F1A?text=+) #FF3F1A |
| txtfourth | ![#0B74E5](https://via.placeholder.com/10/0B74E5?text=+) #0B74E5 |
| txtfifth | ![#38383D](https://via.placeholder.com/10/38383D?text=+) #38383D |
| blue-hovered | ![#0D5BB5](https://via.placeholder.com/10/0D5BB5?text=+) #0D5BB5 |
| gray-primary | ![#F5F5FA](https://via.placeholder.com/10/F5F5FA?text=+) #F5F5FA |
| gray-icon | ![#515158](https://via.placeholder.com/10/515158?text=+) #515158 |
| gray-border | ![#EBEBF0](https://via.placeholder.com/10/EBEBF0?text=+) #EBEBF0 |
| black-primary | ![#0a0604](https://via.placeholder.com/10/0a0604?text=+) #0a0604 |
| gray-secondary | ![#2a2a28](https://via.placeholder.com/10/2a2a28?text=+) #2a2a28 |
| gray-third | ![#dbdbdb](https://via.placeholder.com/10/dbdbdb?text=+) #dbdbdb |
| gray-fourth | ![#8f9b99](https://via.placeholder.com/10/8f9b99?text=+) #8f9b99 |
-->

## Author by [Teknix](https://www.teknixcorp.com/?fbclid=IwY2xjawHElLpleHRuA2FlbQIxMAABHR6EZwakHG-2N0F-bJcyEARO3sKr-EfR3zKs8IA9e6nWFaTmj8qOy8NNiA_aem_u226XnP5h5oT40NBbM7Zsg)

## License

[MIT](https://choosealicense.com/licenses/mit/)

// Manifest
// import type { MetadataRoute } from "next";

// export default function manifest(): MetadataRoute.Manifest {
// return {
// name: "NVBPlay - Nền tảng thương mại điện tử cao cấp",
// short_name: "NVBPlay",
// description:
// "Nền tảng thương mại điện tử giá cả phải chăng | NVBPlay - Nền tảng thương mại điện tử trực tuyến đáng tin cậy của bạn",
// start_url: `/`,
// display: "standalone",
// orientation: "portrait",
// background_color: "#fff",
// theme_color: "#fff",
// icons: [
// {
// src: `/nvb-play.svg`,
// sizes: "192x192",
// type: "image/svg",
// },
// {
// src: `/nvb-play.svg`,
// sizes: "512x512",
// type: "image/svg",
// },
// ],
// };
// }
