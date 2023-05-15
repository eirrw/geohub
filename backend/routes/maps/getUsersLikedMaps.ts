import { ObjectId } from 'mongodb'
import { NextApiResponse } from 'next'
import NextApiRequestWithSession from '../../types/NextApiRequestWithSession'
import { collections } from '../../utils/dbConnect'

// Returns 10 maps by default
const getUsersLikedMaps = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  const userId = req.user.id
  const count = Number(req.query.count as string)

  const likedMaps = await collections.mapLikes
    ?.aggregate([
      { $match: { userId: new ObjectId(userId) } },
      {
        $lookup: {
          from: 'maps',
          localField: 'mapId',
          foreignField: '_id',
          as: 'mapDetails',
        },
      },
      {
        $unwind: '$mapDetails',
      },
    ])
    .limit(count || 10)
    .toArray()

  if (!likedMaps) {
    return res.status(400).send(`Failed to get users liked maps with user id: ${userId}`)
  }

  res.status(200).send(likedMaps)
}

export default getUsersLikedMaps