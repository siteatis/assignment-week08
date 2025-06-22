import { checkPassword, createNewPassword } from "@u/security";
import { dbqry, dbpost } from "@u/dataLayer";
import { revalidatePath } from "next/cache";

// TODO: Pass down loggedInState
// TODO: For walking skeleton, we're not logged in yet and we'll create user only

// If not logged in, offer login, with create button that goes to create
// If logging in, use: checkPassword(password, user.pwdNumber); and then set logged in
// If creating, use: const { pwdNumber, password } = createNewPassword(); and show to user
//  and create user in DB: dbpost(dbqry.postNewUsr, [ username, pwdNumber ]);
// If logging out, nothing to do, just log out
// Display total number of comments and posts commented on

var loggedIn = false;

export default function UserPage() {
  dbpost(dbqry.postNewUsr, [username, pwdNumber]);

  async function handleSubmit(formData) {
    // A "Server Function" is an async func that runs in the server.
    // We can easily factor it out into a component if we want, and then we
    // have our DB API ready to call from anywhere.
    "use server";
    const { pwdNumber, password } = createNewPassword();
    dbpost(dbqry.postNewUsr, [formData.username, pwdNumber]);
    // TODO: show new password to user properly before revalidating?!
    revalidatePath("/"); // Logging in changes everything, right back to the root
  }

  return (
    <>
      <h1>User Details</h1>
      <form action={handleSubmit}>
        {/* Using action because can't handle events in server */}
        <fieldset>
          <legend>Create a new user:</legend>
          <label>
            Name:
            <input
              name="name"
              required
              placeholder="between 6 and 40 characters"
              minLength={6}
              maxLength={40}
            />
          </label>
          <label>
            Password:
            <input name="password" disabled />
          </label>
        </fieldset>
        <button>Create user</button>
      </form>
    </>
  );
}
