import { NextResponse } from 'next/server';
import { firestore } from '../../../firebase/admin';

export async function GET(request, context, response) {
  const id = context.params.id;
  console.log('id', id);

  const tweet = await
  firestore
    .collection('tweets')
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data();
      const id = doc?.id;
      const createdAt  = data?.createdAt

      console.log('data', data);

      return {
        ...data,
        id,
        createdAt: +createdAt?.toDate(),
      };
    })
    .catch((error) => {
      return {
        error: error.message,
      }
    });

  if (tweet.error) {
    return NextResponse.json({
      error: tweet.error,
    }, {
      status: 401,
      });
  } else if (!tweet.createdAt) {
    return NextResponse.json({
      error: 'Tweet not found',
    }, {
      status: 404,
      });
    }
  else {
    return NextResponse.json(tweet);
  }
}
