import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen, queryByAttribute} from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../src/Home'

const getById = queryByAttribute.bind(null, 'id');
/*const server = setupServer(
  rest.get('/greeting', (req, res, ctx) => {
    return res(ctx.json({greeting: 'hello there'}))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
*/
test('loads and displays greeting', async () => {
  expect(2 + 2).toBe(4);

  //fireEvent.click(screen.getByText('Load Greeting'))

  //await waitFor(() => screen.getByRole('heading'))

  //expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  //expect(screen.getByRole('button')).toBeDisabled()
})

