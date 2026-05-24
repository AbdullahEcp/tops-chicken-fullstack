import { useEffect, useMemo, useState } from "react";
import {
  FaUsers,
  FaSearch,
  FaEnvelope,
  FaUserShield,
  FaCalendarAlt,
  FaCrown,
  FaTrash,
} from "react-icons/fa";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const loadUsers = async () => {
    try {
      const res = await fetch(`${API}/api/users/admin/all`);
      const data = await res.json();

      if (data.success) setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = confirm("Delete this user permanently?");
    if (!confirmDelete) return;

    const res = await fetch(`${API}/api/users/admin/delete/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      loadUsers();
    } else {
      alert(data.message || "User delete failed");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const text = `${user.fullName} ${user.email} ${user.role}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [users, search]);

  const customers = users.filter((user) => user.role === "customer").length;
  const admins = users.filter((user) => user.role === "admin").length;

  return (
    <div>
      <div className="rounded-[40px] bg-gradient-to-r from-black via-red-950 to-red-700 p-8 text-white shadow-2xl">
        <p className="text-sm font-black uppercase tracking-[4px] text-yellow-300">
          Customer List
        </p>

        <h1 className="mt-3 text-5xl font-black">Registered Customers</h1>

        <p className="mt-3 max-w-3xl font-semibold text-gray-200">
          View, search and remove registered users from the admin panel.
        </p>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <Stat title="Total Users" value={users.length} icon={<FaUsers />} />
        <Stat title="Customers" value={customers} icon={<FaUsers />} />
        <Stat title="Admins" value={admins} icon={<FaUserShield />} />
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-3xl bg-white p-4 shadow-xl">
        <FaSearch className="text-red-700" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customer by name, email or role"
          className="w-full bg-transparent font-bold outline-none"
        />
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredUsers.length === 0 ? (
          <div className="rounded-[32px] bg-white p-10 text-center shadow-xl md:col-span-2 xl:col-span-3">
            <h2 className="text-3xl font-black">No Customers Found</h2>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="overflow-hidden rounded-[36px] bg-white shadow-2xl"
            >
              <div className="bg-gradient-to-r from-black to-red-950 p-6 text-white">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-400 text-4xl text-black shadow-xl">
                      {user.role === "admin" ? <FaCrown /> : <FaUsers />}
                    </div>

                    <h2 className="mt-5 text-3xl font-black">
                      {user.fullName}
                    </h2>

                    <span className="mt-3 inline-block rounded-full bg-yellow-400 px-4 py-2 text-sm font-black text-black">
                      {user.role}
                    </span>
                  </div>

                  {user.role !== "admin" && (
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-red-700 text-xl text-white shadow-xl hover:bg-white hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-4 p-6">
                <Info icon={<FaEnvelope />} title="Email" value={user.email} />

                <Info
                  icon={<FaCalendarAlt />}
                  title="Joined"
                  value={new Date(user.createdAt).toLocaleDateString()}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Stat({ title, value, icon }) {
  return (
    <div className="rounded-[32px] bg-white p-6 shadow-xl">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-700 text-3xl text-yellow-300">
        {icon}
      </div>

      <p className="mt-5 text-sm font-black uppercase tracking-[3px] text-gray-500">
        {title}
      </p>

      <h2 className="mt-2 text-5xl font-black text-black">{value}</h2>
    </div>
  );
}

function Info({ icon, title, value }) {
  return (
    <div className="rounded-2xl bg-gray-100 p-4">
      <div className="flex items-center gap-3">
        <span className="text-red-700">{icon}</span>
        <p className="text-sm font-bold text-gray-500">{title}</p>
      </div>

      <h4 className="mt-2 break-all font-black text-black">{value}</h4>
    </div>
  );
}``
