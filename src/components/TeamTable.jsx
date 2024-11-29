export const TeamTable = ({ teams, isCoach, currentUserEmail, onJoinClick }) => {
    return (
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full text-white">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-6 py-3 text-left">Nombre del equipo</th>
              <th className="px-6 py-3 text-left">Deporte</th>
              <th className="px-6 py-3 text-left">Categoría</th>
              <th className="px-6 py-3 text-left">Jugadores</th>
              <th className="px-6 py-3 text-left">Ubicación</th>
              <th className="px-6 py-3 text-left">Descripción</th>
              {!isCoach && <th className="px-6 py-3 text-left">Acción</th>}
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr 
                key={team.id} 
                className={`border-t border-gray-700 ${team.owner === currentUserEmail ? 'bg-emerald-900 bg-opacity-20' : ''}`}
              >
                <td className="px-6 py-4">{team.name}</td>
                <td className="px-6 py-4">{team.sport}</td>
                <td className="px-6 py-4">{team.category}</td>
                <td className="px-6 py-4">{team.players}</td>
                <td className="px-6 py-4">{team.location}</td>
                <td className="px-6 py-4">{team.description}</td>
                {!isCoach && (
                  <td className="px-6 py-4">
                    <button
                      onClick={onJoinClick}
                      className="bg-emerald-400 text-white px-4 py-1 rounded hover:bg-emerald-500"
                    >
                      Unirse
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };