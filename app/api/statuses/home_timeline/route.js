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
];

export async function GET(req, res) {
  return NextResponse.json(timeline);
  
};
