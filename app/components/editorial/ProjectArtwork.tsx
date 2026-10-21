import type { Project } from '@/data/projects';
import ChatArchitecture from './ChatArchitecture';
import PetPipeline from './PetPipeline';
import ProjectTechnicalFigure from './ProjectTechnicalFigure';

export default function ProjectArtwork({ project }: { project: Project }) {
  if (project.slug === 'distributed-chat-system') return <ChatArchitecture compact/>;
  if (project.slug === 'occluded-pet-detection') return <PetPipeline/>;
  return <ProjectTechnicalFigure slug={project.slug}/>;
}
