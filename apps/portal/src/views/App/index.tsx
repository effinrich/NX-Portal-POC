/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy, Suspense, useEffect, useState } from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { useLocalStorage } from 'react-use'
import { useAuth0 } from '@auth0/auth0-react'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  CloseButton,
  Image,
  VStack
} from '@chakra-ui/react'
import axios from 'axios'
// import loadable from '@loadable/component'
import fetch from 'cross-fetch'
import produce from 'immer'
import jsonpipe from 'jsonpipe'
import styled from 'styled-components'

import logo from '../../assets/logo.png'
import { Card, Loader, LoginButton, ProtectedRoute } from '../../components'

import { SideBar } from './partials/SideBar'

// const Dashboard = lazy(() => import('../Dashboard'))
const Home = lazy(() => import('../Home'))
// const Login = lazy(() => import('../Login'))
const MapViewer = lazy(() => import('../MapViewer'))
const Profile = lazy(() => import('../Profile'))
const Users = lazy(() => import('../Users'))
const Settings = lazy(() => import('../Settings'))

const StyledApp = styled.div``

// interface IApi extends Users, ApiResponse {}
type DecodedToken = {
  user: Record<string, unknown>
}

type Body = {
  decodedToken: DecodedToken
  access_token
}

type UserProfile = {
  body: Body
}
interface Post {
  id: number
  name: string
}

export interface IMapData {
  result: Record<string, unknown>
  coords: {
    lat: number
    lng: number
  }
}
export interface ICoords {
  lat: number
  lng: number
}

const formatCoords = n => {
  if (n) {
    const l = n.toString().length - 3
    const v = n / Math.pow(10, l)

    return v
  }
}

export function App() {
  const { isLoading, error, isAuthenticated } = useAuth0()

  // const location = useLocation()
  const [coords, setCoords] = useState<ICoords>()
  const [mapData, setMapData] = useState({
    result: {
      modelBuf: {
        centroids: {
          geometry: {
            coords: {}
          }
        }
      }
    }
  })

  const [profile] = useLocalStorage<UserProfile>(
    '@@auth0spajs@@::O4WHfTk59tlLSzX3seoBR4uFosfIZUwu::project_pluto_324014::openid profile email read:users offline_access'
  )

  // if (!isAuthenticated) {
  //   logout({
  //     returnTo: window.location.origin
  //   })
  // }

  useEffect(() => {
    if (isAuthenticated) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const authToken = `Bearer ${profile?.body.access_token}`
      const url = 'https://rest.pluto.thepublichealthco.com/jwt/model_bufs'

      const jsonResponse = []

      const modelBuf = {
        result: []
      }

      const fetchPipeData = async () => {
        await produce(modelBuf, async function (draft: any) {
          draft.result = await jsonpipe.flow(url, {
            delimiter: '\n', // String. The delimiter separating valid JSON objects; default is "\n\n"
            onUploadProgress: function (progressEvent) {
              // Do something with browser's upload progress event
            },

            success: function (data) {
              // delete
              // const deletedResultKey = produce(data, draft => {
              //   delete draft['result']
              // })

              // const deletedModelBufKey = produce(data, draft => {
              //   delete draft['modelBuf']
              // })

              jsonResponse.push(data)
              console.log(jsonResponse)
              // Do something with this JSON chunk
            },
            error: function (errorMsg) {
              console.log('errorMsg = ', errorMsg)
              // Something wrong happened, check the error message
            },
            complete: function (statusText) {
              // Called after success/error, with the XHR status text
            },
            timeout: 3000, // Number. Set a timeout (in milliseconds) for the request
            method: 'POST', // String. The type of request to make (e.g. "POST", "GET", "PUT"); default is "GET"
            headers: {
              // Object. An object of additional header key/value pairs to send along with request
              Authorization: authToken
            },
            data: '', // String | FormData | File | Blob. What to be sent in the request body.
            disableContentType: false, // By default jsonpipe will set `Content-Type` to "application/x-www-form-urlencoded", you can set `disableContentType` to `true` to skip this behavior. Must set `true` if your `data` is not a string.
            withCredentials: false // Boolean. Send cookies when making cross-origin requests; default is true
          })
        })
      }

      console.log(fetchPipeData())
      // console.log('jsonResponse = ', jsonResponse)

      const fetchMapData = async () => {
        try {
          const response = await axios({
            method: 'post',
            url: url,
            responseType: 'json',
            headers: {
              Authorization: authToken,
              'Content-Type': 'application/json; charset=utf-8'
            },
            transformResponse: [
              function (data) {
                // data.text().then(text => {

                // data.text().then(text => {
                // const reg = /:\s*(\d{15,25})(\s*\}|,?)/
                // const textdata = `${data.replace(/}{/g, '},{')}`

                // const res = textdata.split(',')

                // const jsonArray = res.map(element => {
                //   try {
                //     return JSON.parse(`${element}}`)
                //   } catch (e) {
                //     return {
                //       bad_json: 'MALFORMED JSON'
                //     }
                //   }
                // })
                // // console.log(jsonArray);
                // const records = jsonArray.map(obj => !obj.bad_json)
                // const list = records.join(', ')
                // console.log(list)
                // console.log(JSON.stringify(res))
                // // '[' + response.data.replace(/}{/g, '},{') + ']'
                // // console.log(text)
                // // })
                return data
              }
            ]
          })

          const lines = response.data.split(/\n/)
          const wrapped = `[${lines.join(',')}]`
          wrapped.replace(/_([^,]*)$/, '$1')
          const obj = JSON.stringify(wrapped)

          let parsedObj = JSON.parse(obj)
          const n = parsedObj.lastIndexOf(',')
          parsedObj =
            parsedObj.slice(0, n) + parsedObj.slice(n).replace(',', '')
          // console.log(parsedObj)

          // const str =
          //   '{"data":{"time":"2016-08-08T15:13:19.605234Z","x":20,"y":30}}{"data":{"time":"2016-08-08T15:13:19.609522Z","x":30,"y":40}}'
          // const data = (function (input) {
          //   let odd = true

          //   return input.split(/\}\s*\{/g).reduce(function (res, part, i) {
          //     if (odd) {
          //       part += '} '
          //     } else {
          //       part = '{' + part
          //     }

          //     odd = !odd

          //     res[i] = JSON.parse(part)

          //     return res
          //   }, {})
          // })(str)

          // console.log('tough:', response.data)
          // console.log('data:', data)
          // const sanitized = '[' + response.data.replace(/}{/g, '},{') + ']'
          // const res = JSON.parse(sanitized)
          // console.log(res)
          // console.log(response.data)
          // const textArray = response.data.split('}')

          // const jsonArray = textArray.map(element => {
          //   try {
          //     return JSON.parse(`${element}}`)
          //   } catch (e) {
          //     return {
          //       bad_json: 'MALFORMED JSON'
          //     }
          //   }
          // })
          // // console.log(jsonArray);
          // const records = jsonArray.map(obj => JSON.stringify(obj))
          // const list = records.join(', ')

          // console.log(list)
        } catch (error) {
          console.error(error)
        }
      }

      //   const res = await fetch(url, {
      //     method: 'POST',
      //     body: JSON.stringify({
      //       search_criteria: {
      //         search_condition: [
      //           {
      //             field_condition: [
      //               {
      //                 field: 'forecasted_cases',
      //                 operation: 'NUM_RANGE',
      //                 value: {
      //                   range_value: {
      //                     min_inclusive: true,
      //                     max: 200
      //                   }
      //                 }
      //               }
      //             ]
      //           }
      //         ],
      //         sorting_criteria: [
      //           {
      //             attribute: 'id',
      //             order: 'DESCENDING'
      //           }
      //         ]
      //       }
      //     }),
      //     headers: {
      //       Authorization: authToken,
      //       'Content-Type': 'application/json; charset=utf-8'
      //     }
      //   })
      //   console.log(res.body)
      //   // const jsonRes = res.body(object => {
      //   //   return console.log(object)
      //   // })

      // const data = await res.json()
      // setMapData(data)

      // const lat = data.result?.modelBuf.centroids.geometry.coords[0]
      // const lng = data.result?.modelBuf.centroids.geometry.coords[1]

      // setCoords({
      //   lat: formatCoords(lat),
      //   lng: formatCoords(lng)
      // })

      // return data
      fetchMapData()
    }
  }, [profile, setMapData, setCoords, isAuthenticated])

  if (isLoading) {
    return <Loader />
  }

  return (
    <StyledApp>
      {isAuthenticated ? (
        <SideBar
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          profile={profile! && profile?.body.decodedToken.user}
          isAuthenticated
        >
          <Box p="4">
            {error && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle mr={2}>Auth Error</AlertTitle>
                <AlertDescription>{error.message}</AlertDescription>
                <CloseButton position="absolute" right="8px" top="8px" />
              </Alert>
            )}
          </Box>
          <Suspense fallback={<Loader />}>
            <Switch>
              {/* <Route exact path="/login" component={Login} /> */}
              <ProtectedRoute exact path="/">
                <Redirect to="/home" />
              </ProtectedRoute>
              <ProtectedRoute path="/home" component={Home} />
              <ProtectedRoute path="/profile" component={Profile} />
              <ProtectedRoute path="/map-viewer" component={MapViewer} />
              <ProtectedRoute path="/users" component={Users} />
              <ProtectedRoute path="/settings" component={Settings} />
              {/* <Route render={() => <Redirect to="/login" />} /> */}
            </Switch>
          </Suspense>
        </SideBar>
      ) : (
        <Card
          mt={100}
          maxW={400}
          minH={200}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection={['row']}
        >
          <VStack spacing={4} align="stretch">
            <Box pb={6}>
              <Center>
                <Image src={logo} maxW="200" />
              </Center>
            </Box>
            <Box>
              <LoginButton />
            </Box>
          </VStack>
        </Card>
      )}
    </StyledApp>
  )
}

export default App
