import { Profile } from "src/profile/entities/profile.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity('education')
export class Education {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    name: string
    
    @Column()
    description: string

    @Column({nullable: true})
    duration: number
    
    @Column()
    startDate: Date
    
    @Column()
    finishDate: Date
    
    @Column({nullable: true})
    image: string

    @ManyToOne(()=> Profile, (profile) => profile.educations)
    owner: Profile;
}
