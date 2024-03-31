import { backendurl } from './Backendpoint';
import { InviteUrlCreateResponse, Message, ConnectionData } from './Types';


export async function CreateInviteToken(JWTToken: string): Promise<InviteUrlCreateResponse> {
  try {
    const response = await fetch(`${backendurl}api/invite/create`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JWTToken}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to create invite url token');
    }
    return response.json();
  } catch (error) {
    console.error('send verification email error:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
}

export async function VerifyInviteToken(token_id: string): Promise<void> {
  try {
    const response = await fetch(`${backendurl}api/invite/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token_id: token_id})
    });

    const responseObject: Message = await response.json();
    if (!response.ok) {
      throw new Error(`${responseObject.message}`);
    }
    return;
  } catch (error) {
    // Handle error
    console.error('send verification email error:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
}


export async function ConnectWithInviteToken(token_id: string, jwt: string): Promise<ConnectionData> {
  try {
    const response = await fetch(`${backendurl}api/invite/connect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
      body: JSON.stringify({token_id: token_id})

    });
    if (!response.ok) {
      throw new Error('Failed to connect with invite link');
    }

    return response.json();
  } catch (error) {
    // Handle error
    console.error('Failed to connect with invite link', error);
    throw error; // Rethrow the error to be caught by the caller
  }
}
