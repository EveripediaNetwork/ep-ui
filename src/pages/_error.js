import NextErrorComponent from 'next/error'
const MyError = ({ statusCode }) => {
  return <NextErrorComponent statusCode={statusCode} />
}
export default MyError
