import { NextResponse } from 'next/server';
import Image from 'next/image';
import userImage from '../../../../public/user.png';



const timeline = [
  {
    id: '0',
    avatar: <Image src={userImage} alt="User Avatar" />,
    username: 'wongmjane',
    message: `Twitter Web App now runs ES6+ for modern browsers*, reducing the polyfill bundle size by 83%
  
  (gzipped size went from 16.6 KB down to 2.7 KB!!)
  
  * Chrome 79+, Safari 14+, Firefox 68+`,
  },
  {
    id: '1',
    avatar: <Image src={userImage} alt="User Avatar" />,
    username: 'midudev',
    message: 'Wow, devter está funcionando y vivo 🦉',
    name: 'Miguel Ángel Durán',
  },
  {
    id: '2',
    username: 'd4nidev',
    name: 'Daniel de la Cruz',
    avatar: <Image src={userImage} alt="User Avatar" />,
    message: `Abro paraguas Paraguas
  
  Clean Code es un libro obsoleto que en 2020, con los paradigmas de desarrollo de software que manejamos, puede hacerte más daño que beneficio.`,
  },
  {
    id: '3',
    avatar: <Image src={userImage} alt="User Avatar" />,
    username: 'wongmjane',
    message: `Twitter Web App now runs ES6+ for modern browsers*, reducing the polyfill bundle size by 83%
  
  (gzipped size went from 16.6 KB down to 2.7 KB!!)
  
  * Chrome 79+, Safari 14+, Firefox 68+`,
  },
  {
    id: '4',
    avatar: <Image src={userImage} alt="User Avatar" />,
    username: 'midudev',
    message: 'Wow, devter está funcionando y vivo 🦉',
    name: 'Miguel Ángel Durán',
  },
  {
    id: '5',
    username: 'd4nidev',
    name: 'Daniel de la Cruz',
    avatar: <Image src={userImage} alt="User Avatar" />,
    message: `Abro paraguas Paraguas
  
  Clean Code es un libro obsoleto que en 2020, con los paradigmas de desarrollo de software que manejamos, puede hacerte más daño que beneficio.`,
  },
  {
    id: '6',
    avatar: <Image src={userImage} alt="User Avatar" />,
    username: 'wongmjane',
    message: `Twitter Web App now runs ES6+ for modern browsers*, reducing the polyfill bundle size by 83%
  
  (gzipped size went from 16.6 KB down to 2.7 KB!!)
  
  * Chrome 79+, Safari 14+, Firefox 68+`,
  },
  {
    id: '7',
    avatar: <Image src={userImage} alt="User Avatar" />,
    username: 'midudev',
    message: 'Wow, devter está funcionando y vivo 🦉',
    name: 'Miguel Ángel Durán',
  },
  {
    id: '8',
    username: 'd4nidev',
    name: 'Daniel de la Cruz',
    avatar: <Image src={userImage} alt="User Avatar" />,
    message: `Abro paraguas Paraguas
  
  Clean Code es un libro obsoleto que en 2020, con los paradigmas de desarrollo de software que manejamos, puede hacerte más daño que beneficio.`,
  },
  {
    id: '9',
    avatar: <Image src={userImage} alt="User Avatar" />,
    username: 'midudev',
    message: 'Wow, devter está funcionando y vivo 🦉',
    name: 'Miguel Ángel Durán',
  },
  {
    id: '10',
    username: 'd4nidev',
    name: 'Daniel de la Cruz',
    avatar: <Image src={userImage} alt="User Avatar" />,
    message: `Abro paraguas Paraguas
  
  Clean Code es un libro obsoleto que en 2020, con los paradigmas de desarrollo de software que manejamos, puede hacerte más daño que beneficio.`,
  },
  {
    id: '11',
    avatar: <Image src={userImage} alt="User Avatar" />,
    username: 'midudev',
    message: 'Wow, devter está funcionando y vivo 🦉',
    name: 'Miguel Ángel Durán',
  },
  {
    id: '12',
    username: 'd4nidev',
    name: 'Daniel de la Cruz',
    avatar: <Image src={userImage} alt="User Avatar" />,
    message: `Abro paraguas Paraguas
  
  Clean Code es un libro obsoleto que en 2020, con los paradigmas de desarrollo de software que manejamos, puede hacerte más daño que beneficio.`,
  },
];

export async function GET(req, res) {
  return NextResponse.json(timeline);
  
};
