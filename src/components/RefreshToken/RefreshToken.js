import axios from 'axios'
import {useAuthHeader, createRefresh} from 'react-auth-kit'

const RefreshToken = createRefresh({
  interval: 60,   // Refreshs the token in every n minutes
  refreshApiCallback: async (
    {
      authToken,
      authTokenExpireAt,
      refreshToken,
      refreshTokenExpiresAt,
      authUserState
    }) => {
    try {
      const response = await axios
        //edit proper route here
        .post("/", {'refresh': refreshToken}, {headers: {'Authorization': `Bearer ${authToken}`}})
      return {
        isSuccess: true,
        newAuthToken: response.data.access_token,
        newRefreshToken: response.refresh_token
      }
    }
    catch(error){
      console.error(error);
      return {
        isSuccess: false
      } 
    }    
  }
})

export default RefreshToken;