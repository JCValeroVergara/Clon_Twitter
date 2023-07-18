import Devit from '@/app/components/Devit/page'


import styles from './idTweet.module.css'

export default function DevitPage(props) {
  console.log(props)
  
  return (
    <>
      <div className={styles.main}>
        <Devit {...props} />

      <h2>se puede cambiar</h2>
      </div>
    </>
  )
}



export async function getServerSideProps(context) {

  const { params, res } = context
  const { id } = params
  
  const apiResponse = await fetch(`http://localhost:3000/api/tweet/${id}`)
  console.log(apiResponse)
  if (apiResponse.ok) {
    const props = await apiResponse.json()
    return { props }
  }
  if (res) {
    res.writeHead(301, { Location: '/home' }).end()
  }
}