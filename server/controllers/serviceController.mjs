import {
  getAverageSpentTimeByService,
  updateAverageTime,
} from '../dao/serviceDao.mjs';

export async function updateServiceAverageTime(req, res) {
  const { service_id } = req.params;

  try {
    // Fetch average spent time from history
    const avgSpentTime = await getAverageSpentTimeByService(service_id);

    // Update service's average_time field
    await updateAverageTime(service_id, avgSpentTime);

    // Send success response
    res.json({
      success: true,
      message: `Average time for service ID ${service_id} updated successfully.`,
      average_time: avgSpentTime,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      message: `Error updating service: ${error.message}`,
    });
  }
}
