from django.shortcuts import render, redirect
from decouple import config
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from requests import Request, post
from .util import update_or_create_user_token

class AuthURL(APIView):

  def get(self, request, format=None):
    client_id = config('CLIENT_ID')
    redirect_uri = config('REDIRECT_URI')

    scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'

    url = Request('GET', 'https://accounts.spotify.com/authorize', params={
      'scope': scopes,
      'response_type': 'code',
      'redirect_uri': redirect_uri,
      'client_id': client_id
    }).prepare().url

    return Response({'url': url}, status=status.HTTP_200_OK)

def spotify_callback(request, format=None):
  redirect_uri = config('REDIRECT_URI')
  client_id = config('CLIENT_ID')
  client_secret = config('CLIENT_SECRET')
  code = request.GET.get('code')
  error = request.GET.get('error')


  response = post('https://accounts.spotify.com/api/token', data={
    'grant_type': 'authorization_code',
    'code': code,
    'redirect_uri': redirect_uri,
    'client_id': client_id,
    'client_secret': client_secret
  }).json()

  access_token = response.get('access_token')
  token_type = response.get('token_type')
  refresh_token = response.get('refresh_token')
  expires_in = response.get('expires_in')
  error = response.get('error')

  if not request.session.exists(request.session.session_key):
    request.session.create()


  update_or_create_user_token(request.session.session_key, access_token, token_type, expires_in, refresh_token)

  return redirect('frontend:')

