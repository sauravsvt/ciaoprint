import React, { useEffect, useState } from "react";

function Admin() {
  const [users, setUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const databaseURL =
    "https://printge-bd4b6-default-rtdb.firebaseio.com/users.json";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(databaseURL);
        const data = await response.json();

        const usersArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        const filteredUsers = usersArray.filter((user) => !user.isPrinted);

        filteredUsers.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );

        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsers();
  }, [databaseURL]);

  const markPrinted = async (id) => {
    try {
      await fetch(
        `https://printge-bd4b6-default-rtdb.firebaseio.com/users/${id}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isPrinted: true }),
        }
      );

      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const showDetails = (user) => {
    // Store only the necessary details for the modal
    const userDetails = {
      ticketId: user.ticketId,
      username: user.username,
      phone: user.phone,
      address: user.address,
      remarks: user.remarks, // Ensure 'remarks' is properly referenced
      deliveryTime: user.deliveryTime,
      numberOfCopies: user.numberOfCopies,
      printPreferences: user.printPreferences,
      files: user.files, // Ensure files contain fileName and url
      timestamp: user.timestamp,
    };

    setSelectedUser(userDetails);
  };

  const hideDetails = () => {
    setSelectedUser(null);
  };

  return (
    <div className="bg-gray-100">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-600 uppercase text-lg leading-normal">
            <tr>
              <th className="py-4 px-6 text-left">Ticket ID</th>
              <th className="py-4 px-6 text-left">Phone</th>
              <th className="py-4 px-6 text-left">Address</th>
              <th className="py-4 px-6 text-left">Files</th>
              <th className="py-4 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-lg font-light">
            {users ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-300 hover:bg-gray-100"
                >
                  <td className="py-4 px-6 text-left whitespace-nowrap">
                    {user.ticketId}
                  </td>
                  <td className="py-4 px-6 text-left">{user.phone}</td>
                  <td className="py-4 px-6 text-left">{user.address}</td>
                  <td className="py-4 px-6 text-left">
                    <ul className="list-decimal pl-6">
                      {user.files &&
                        user.files.map((file, index) => (
                          <li key={index} className="mb-2">
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {file.fileName}
                            </a>
                          </li>
                        ))}
                    </ul>
                  </td>
                  <td className="py-4 px-6 text-left">
                    <button
                      onClick={() => showDetails(user)}
                      className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-700"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => markPrinted(user.id)}
                      className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-700 ml-2"
                    >
                      Mark Printed
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 px-6 text-center">
                  Loading data...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 w-2/3 max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              User Details
            </h2>
            <button
              onClick={hideDetails}
              className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-700 mb-4"
            >
              Close
            </button>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Ticket ID</h3>
                <p>{selectedUser.ticketId}</p>
              </div>
              <div>
                <h3 className="font-semibold">Username</h3>
                <p>{selectedUser.username}</p>
              </div>
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p>{selectedUser.phone}</p>
              </div>
              <div>
                <h3 className="font-semibold">Address</h3>
                <p>{selectedUser.address}</p>
              </div>
              <div>
                <h3 className="font-semibold">Delivery Time</h3>
                <p>{selectedUser.deliveryTime}</p>
              </div>
              <div>
                <h3 className="font-semibold">Number of Copies</h3>
                <p>{selectedUser.numberOfCopies}</p>
              </div>
              <div>
                <h3 className="font-semibold">Print Preferences</h3>
                <p>Color: {selectedUser.printPreferences.color}</p>
                <p>Sides: {selectedUser.printPreferences.sides}</p>
              </div>
              <div>
                <h3 className="font-semibold">Files</h3>
                <ul className="list-decimal pl-6">
                  {selectedUser.files &&
                    selectedUser.files.map((file, index) => (
                      <li key={index} className="mb-2">
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {file.fileName}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Remarks</h3>
                <p>{selectedUser.remarks}</p>
              </div>
              <div>
                <h3 className="font-semibold">Timestamp</h3>
                <p>{selectedUser.timestamp}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
