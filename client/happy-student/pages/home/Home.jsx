import React from 'react'

function home() {
  return (
      <div class="signup-container">
              <h1>Happy Student Signup</h1>
              <form id="signup-form">
                  <div class="form-group">
                      <label for="name">Name</label>
                      <input type="text" id="name" name="name" placeholder="Your Name" required></input>
                  </div>
                  <div class="form-group">
                      <label for="email">Email</label>
                      <input type="email" id="email" name="email" placeholder="Your Email" required></input>
                  </div>
                  <div class="form-group">
                      <label for="password">Password</label>
                      <input type="password" id="password" name="password" placeholder="Your Password" required></input>
                  </div>
                  <button type="submit">Signup</button>
              </form>
          </div>
  )
      
}

export default home