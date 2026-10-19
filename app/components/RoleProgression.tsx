import type { Experience } from '@/data/experiences';

export default function RoleProgression({ roles }: { roles: Experience['roles'] }) {
  return <div className="role-progression">
    {roles.map(role => <div key={role.title}>
      <h3>{role.title}</h3>
      <p>{role.dates}</p>
    </div>)}
  </div>;
}
