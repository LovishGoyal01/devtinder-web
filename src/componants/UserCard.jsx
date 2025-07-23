 
const UserCard = ({user}) => {

   const {firstName , lastName , photoURL, age , gender , about , skills} = user;

    return (
        <div>
          <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
              <img
               src= {photoURL}
               alt="Photo" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{firstName + " " + lastName}</h2>
              <p>{age + " , " + gender}</p>
              <p>{about}</p>
              {skills && <p>{skills}</p>}
              <div className="card-actions justify-evenly">
                <button className="btn btn-primary">Ignore</button>
                <button className="btn btn-secondary">Interested</button>
              </div>
            </div>
          </div>
        </div>

    )
};

export default UserCard;