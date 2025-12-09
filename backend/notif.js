
async function getNotifications(userId) {
  try {
    const [tasks] = await db
      .promise()
      .query(
        `SELECT 
           t.task_id,
           t.title,
           t.description,
           t.start_datetime,
           t.end_datetime,
           tm.is_new
         FROM tasks t
         JOIN team_members tm ON t.task_id = tm.team_id
         WHERE tm.user_id = ? AND tm.is_active = 1
         ORDER BY t.start_datetime ASC`,
        [userId]
      );

    const now = new Date();

    const notifications = tasks.flatMap((task) => {
      const end = new Date(task.end_datetime);
      const diffHours = (end - now) / (1000 * 60 * 60);
      const notes = [];

      if (diffHours <= 5 && diffHours > 0) {
        notes.push({
          type: "due_soon",
          taskId: task.task_id,
          title: task.title,
          description: task.description,
          start_datetime: task.start_datetime,
          end_datetime: task.end_datetime,
          is_new: task.is_new,
        });
      }

      if (diffHours <= 72 && diffHours > 0) {
        notes.push({
          type: "upcoming",
          taskId: task.task_id,
          title: task.title,
          description: task.description,
          start_datetime: task.start_datetime,
          end_datetime: task.end_datetime,
          is_new: task.is_new,
        });
      }

      notes.push({
        type: "assigned",
        taskId: task.task_id,
        title: task.title,
        description: task.description,
        start_datetime: task.start_datetime,
        end_datetime: task.end_datetime,
        is_new: task.is_new,
      });

      return notes;
    });

    return notifications;
  } catch (err) {
    console.error("ERROR GETTING NOTIFICATIONS:", err);
    return [];
  }
}

/**
 * Mark notifications as read by updating team_members
 */
async function markNotificationsRead(userId) {
  try {
    await db
      .promise()
      .query(`UPDATE team_members SET is_new = 0 WHERE user_id = ?`, [userId]);
    return { message: "Notifications marked as read" };
  } catch (err) {
    console.error("ERROR MARKING NOTIFICATIONS READ:", err);
    return { error: "Failed to mark notifications as read" };
  }
}

module.exports = { getNotifications, markNotificationsRead };
