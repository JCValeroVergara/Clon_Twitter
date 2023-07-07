


export default function Timeline({ userName }) {
  console.log(userName);
  return (<h1>This is the Timeline {userName }</h1>
  )
}



Timeline.getinitialProps = async () => {
  return fetch('http://localhost:3000/api/hello')
    .then((res) => res.json())
    .then(response => {
      console.log(response);
      const { userName } = response;
      return { userName }
    })
}

